"use client"

import { useEffect, useRef, useState } from "react"
import { GoogleGenAI } from "@google/genai"
import MessageBubble from "@/components/message-bubble"
import ThinkingIndicator from "@/components/thinking-indicator"
import ChatInput from "@/components/chat-input"
import WelcomeScreen from "@/components/welcome-screen"
import type { Message } from "@/types"
import ChatHeader from "@/components/Chat-header"

const stripMarkdown = (text: string) =>
  text
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/#{1,6}\s+/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/^\s*>\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

export default function FeynmanTutor() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [userInput, setUserInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [currentTopic, setCurrentTopic] = useState("")

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, isThinking])

  const generateAIResponse = async (userExplanation: string): Promise<string> => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY ?? ""
      const ai = new GoogleGenAI({ apiKey })

      const prompt = currentTopic
        ? `The user is trying to explain "${currentTopic}" using the Feynman Technique. Their explanation: "${userExplanation}".`
        : `The user wants to learn about: "${userExplanation}". Help them understand using the Feynman Technique.`

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      })

      return stripMarkdown(response.text ?? "I'm having trouble processing that.")
    } catch (error) {
      console.error("GenAI error:", error)
      return "AI is currently unavailable. Please try again later."
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!userInput.trim()) return

    const userMessage: Message = { role: "user", content: userInput }
    setConversation((prev) => [...prev, userMessage])
    setIsThinking(true)

    if (!currentTopic) setCurrentTopic(userInput.trim())
    setUserInput("")

    const aiText = await generateAIResponse(userInput)
    setConversation((prev) => [...prev, { role: "ai", content: aiText }])
    setIsThinking(false)
  }

  const resetConversation = () => {
    setConversation([])
    setCurrentTopic("")
    setUserInput("")
  }

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden">
      <div className="flex flex-col flex-1 md:border-l md:border-r bg-muted/30">
        <ChatHeader
          title="Feynman AI Tutor"
          subtitle="Simple explanations, deep understanding"
          highlight="indigo"
        />


        {currentTopic && (
          <div className="px-4 py-2 border-b text-sm text-muted-foreground">
            <span className="font-medium text-gray-600 dark:text-gray-300">Current Topic: </span>
            <span className="text-indigo-500 font-semibold">{currentTopic}</span>
          </div>
        )}

        <div className="flex flex-col h-full p-4 overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hidden">
            {conversation.length === 0 ? (
              <WelcomeScreen
                title="Welcome to Feynman"
                subtitle="Start explaining a concept in your own words — I'll help you improve your understanding."
                emoji="📘"
                highlightColor="indigo"
              />

            ) : (
              conversation.map((msg, i) => <MessageBubble key={i} message={msg} />)
            )}
            {isThinking && <ThinkingIndicator />}
            <div ref={endOfMessagesRef} />
          </div>

          <ChatInput
            userInput={userInput}
            setUserInput={setUserInput}
            handleSubmit={handleSubmit}
            isThinking={isThinking}
            isListening={false}
            toggleListening={() => { }}
            videoId=""
            setVideoId={() => { }}
            triggerFileUpload={() => { }}
            fileInputRef={null}
            handleFileUpload={() => { }}
          />
        </div>
      </div>
    </div>
  )
}
