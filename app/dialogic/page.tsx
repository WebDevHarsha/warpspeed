"use client"

import { type ChangeEvent, type FormEvent, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

import VerticalNavbar from "@/components/vertical-navbar"
import WelcomeScreen from "@/components/welcome-screen"
import MessageBubble from "@/components/message-bubble"
import ThinkingIndicator from "@/components/thinking-indicator"
import ChatInput from "@/components/chat-input"
import GraphPanel from "@/components/graph-panel"
import ChatHeader from "@/components/Chat-header"

import { useSpeechRecognition } from "@/hooks/use-speech-recognition"
import { generateAIResponse } from "@/utils/ai-service"
import { handleFileUpload } from "@/utils/file-utils"

import type { Message, Transcript, Expression } from "@/types"

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
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      console.error("AI error:", error)
      const errorMsg = "I apologize, I'm having trouble thinking. Could you please rephrase?"
      setConversation((prev) => [
        ...prev,
        {
          role: "ai",
          content: errorMsg,
        },
      ])
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

  return (
    <div className="relative h-screen w-screen flex bg-gradient-to-br from-background via-background/95 to-background overflow-hidden">
      {/* Background Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400/5 dark:bg-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-cyan-400/10 dark:border-cyan-400/20 rounded-full animate-spin" style={{ animationDuration: "30s" }}></div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex h-screen relative z-10">
        <VerticalNavbar />
      </div>

      {/* Chat Area */}
      <div className={`flex-1 h-screen w-full flex flex-col justify-between items-center z-10 transition-all duration-500 ${showGraph ? "md:w-2/3" : "w-full"}`}>
        <div className="w-full h-full flex flex-col gap-0">
          <Card className="flex-1 flex flex-col bg-background/95 backdrop-blur border shadow-none md:shadow-none overflow-hidden">
            <ChatHeader />
            <CardContent className="flex flex-col justify-between flex-1 p-0">
              <div className="flex-1 overflow-hidden">
                <div className="flex flex-col h-full">
                  {conversation.length === 0 ? (
                    <WelcomeScreen />
                  ) : (
                    conversation.map((message, i) => <MessageBubble key={i} message={message} />)
                  )}
                  {isThinking && <ThinkingIndicator />}
                </div>
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Graph Panel */}
      <GraphPanel showGraph={showGraph} setShowGraph={setShowGraph} expressions={expressions} />
    </div>
  )
}

export default DialogicAITeacher
