"use client"

import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react"
import VerticalNavbar from "@/components/vertical-navbar"
import WelcomeScreen from "@/components/welcome-screen"
import MessageBubble from "@/components/message-bubble"
import ThinkingIndicator from "@/components/thinking-indicator"
import ChatInput from "@/components/chat-input"
import GraphPanel from "@/components/graph-panel"

import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { generateAIResponse } from "@/utils/ai-service"
import { handleFileUpload } from "@/utils/file-utils"

import type { Message, Transcript, Expression } from "@/types"
import ChatHeader from "@/components/Chat-header"

function DialogicAITeacher() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>("")
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [fileContent, setFileContent] = useState<string>("")
  const [isListening, setIsListening] = useState<boolean>(false)
  const [showGraph, setShowGraph] = useState(false)
  const [expressions, setExpressions] = useState<Expression[]>([{ id: "graph1", latex: "y=x^2" }])
  const [videoId, setVideoId] = useState<string>("")
  const [transcript, setTranscript] = useState<Transcript[]>([])
  const [interrupted, setInterrupted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null!)

  const regex = /y\s*=\s*[\w^{}\\]+/g
  useSpeechRecognition({ isListening, setUserInput, setIsListening })

  const generateResponse = async (input: string) => {
    setIsThinking(true)
    try {
      const { generatedText } = await generateAIResponse(input, conversation, fileContent, transcript)
      const mathEquations = generatedText.match(regex)
      if (mathEquations) {
        const desmosExpressions = mathEquations.map((equation, index) => ({
          id: `graph${index + 1}`,
          latex: equation,
        }))
        setExpressions(desmosExpressions)
        setShowGraph(true)
      }

      setConversation((prev) => [
        ...prev,
        { role: "user", content: input },
        { role: "ai", content: generatedText },
      ])
      speakText(generatedText)
    } catch (error) {
      const errorMsg = "I apologize, I'm having trouble thinking. Could you please rephrase?"
      setConversation((prev) => [...prev, { role: "ai", content: errorMsg }])
      speakText(errorMsg)
    }
    setIsThinking(false)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userInput.trim()) {
      generateResponse(userInput)
      setUserInput("")
    }
  }

  const speakText = (text: string) => {
    if (interrupted) {
      window.speechSynthesis.cancel()
      setInterrupted(false)
    }
    const speech = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(speech)
  }

  const handleFileUploadEvent = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const content = await handleFileUpload(file)
        setFileContent(content)
        alert("File uploaded successfully!")
      } catch {
        alert("Error reading file.")
      }
    }
  }

  const triggerFileUpload = () => fileInputRef.current?.click()
  const toggleListening = () => setIsListening((prev) => !prev)


  const endOfMessagesRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, isThinking])



  return (
   <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
  {/* Chat Panel */}
  <div className="flex flex-col flex-1 md:border-l md:border-r bg-muted/30">
    <ChatHeader />

    <div className="flex flex-col h-full p-4 overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hidden">
        {conversation.length === 0 ? (
          <WelcomeScreen />
        ) : (
          conversation.map((message, i) => <MessageBubble key={i} message={message} />)
        )}
        {isThinking && <ThinkingIndicator />}

        {/* Scroll target */}
        <div ref={endOfMessagesRef} />
      </div>

      <ChatInput
        userInput={userInput}
        setUserInput={setUserInput}
        handleSubmit={handleSubmit}
        isThinking={isThinking}
        isListening={isListening}
        toggleListening={toggleListening}
        videoId={videoId}
        setVideoId={setVideoId}
        triggerFileUpload={triggerFileUpload}
        fileInputRef={fileInputRef}
        handleFileUpload={handleFileUploadEvent}
      />
    </div>
  </div>

  {/* Graph Panel */}
  {showGraph && (
    <div className="hidden md:block w-[380px] border-l">
      <GraphPanel showGraph={showGraph} setShowGraph={setShowGraph} expressions={expressions} />
    </div>
  )}
</div>
  )

}

export default DialogicAITeacher
