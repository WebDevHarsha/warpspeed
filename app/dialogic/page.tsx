"use client"

import { GoogleGenerativeAI } from "@google/generative-ai"
import mammoth from "mammoth"
import { type ChangeEvent, type FormEvent, useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"

const DynamicDesmosCalculator = dynamic(() => import("@/components/ui/DesmosCalculator"), {
  ssr: false,
})

interface ApiResponse {
  chatContent: string
  imageUrl: string
}

interface Transcript {
  text: string
  duration: number
  offset: number
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
  interpretation: any
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  onend: () => void
  start: () => void
  stop: () => void
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognition
}

interface Window {
  SpeechRecognition: SpeechRecognitionConstructor
  webkitSpeechRecognition: SpeechRecognitionConstructor
}

interface Message {
  role: "user" | "ai"
  content: string
  imageUrl?: string
}

// Vertical Navbar Component
const VerticalNavbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  return (
    <div
      className={`w-64 h-full flex flex-col transition-all duration-500 ${
        isDarkMode ? "bg-gray-900 border-gray-700" : "bg-[#2C2A4A] border-gray-600"
      } border-r`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="text-2xl font-bold bg-gradient-to-r from-[#00FFFF] to-white bg-clip-text text-transparent">
          MetaLearn
        </div>
        <div className="text-sm text-gray-400 mt-1">Dialogic AI</div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 p-4 space-y-2">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-4">Navigation</div>

        <a
          href="/"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all duration-300"
        >
          <span className="text-lg">🏠</span>
          <span>Home</span>
        </a>

        <a
          href="/dialogic"
          className="flex items-center space-x-3 p-3 rounded-lg bg-[#00FFFF]/20 text-[#00FFFF] border border-[#00FFFF]/30"
        >
          <span className="text-lg">🧠</span>
          <span>Dialogic Chat</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all duration-300"
        >
          <span className="text-lg">📚</span>
          <span>Learning Paths</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all duration-300"
        >
          <span className="text-lg">🌙</span>
          <span>Sleep Learning</span>
        </a>

        <a
          href="#"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-[#00FFFF]/10 hover:text-[#00FFFF] transition-all duration-300"
        >
          <span className="text-lg">⚙️</span>
          <span>Settings</span>
        </a>
      </div>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-800">
          <div className="w-8 h-8 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full flex items-center justify-center">
            <span className="text-white text-sm">👤</span>
          </div>
          <div>
            <div className="text-sm text-white">Student</div>
            <div className="text-xs text-gray-400">Learning Mode</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Page() {
  const [conversation, setConversation] = useState<Message[]>([])
  const [userInput, setUserInput] = useState<string>("")
  const [isThinking, setIsThinking] = useState<boolean>(false)
  const [fileContent, setFileContent] = useState<string>("")
  const [isListening, setIsListening] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [showGraph, setShowGraph] = useState(false)
  const [selectedLLM, setSelectedLLM] = useState<"gemini" | "api">("gemini")
  const [interrupted, setInterrupted] = useState(false)
  const [expressions, setExpressions] = useState<{ id: string; latex: string }[]>([{ id: "graph1", latex: "y=x^2" }])
  const [videoId, setVideoId] = useState<string>("")
  const [transcript, setTranscript] = useState<Transcript[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)

  const regex = /y\s*=\s*[\w^{}\\]+/g

  const genAI = new GoogleGenerativeAI("AIzaSyBd8-ch43rR6Gy9l6y-W_aP59XO7RWusso")

  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("")
        setUserInput(transcript)
      }
      recognition.onend = () => {
        setIsListening(false)
      }
      if (isListening) {
        recognition.start()
      } else {
        recognition.stop()
      }
      return () => {
        recognition.stop()
      }
    } else {
      console.log("Speech recognition not supported")
    }
  }, [isListening])

  async function generateResponse(input: string) {
    setIsThinking(true)
    try {
      let generatedText: string
      let imageUrl = ""

      if (selectedLLM === "gemini") {
        const generationConfig = {
          maxOutputTokens: 500,
          temperature: 0.7,
          topP: 0.8,
          topK: 40,
        }

        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
          generationConfig,
        })

        const conversationHistory = conversation
          .map((msg) => `${msg.role === "user" ? "Student" : "Teacher"}: ${msg.content}`)
          .join("\n")

        const transcriptText = transcript.map((t) => t.text).join(" ")

        const prompt = `
          If someone asks you who created you or anything of that sorts tell "I was built by The Vanguards" only if someone asks.
          You are a Socratic teacher.
          First answer the question that is asked in 5-6 lines and then Engage in a thoughtful dialogue with the student, asking probing questions to help them discover knowledge on their own.
          ${fileContent ? `Consider this additional context from the uploaded document: ${fileContent}` : ""}
          ${transcriptText ? `Consider this as a transcript of a YouTube video: ${transcriptText}` : ""}
          Your response:
        `

        const chat = await model.startChat({
          history: [
            {
              role: "user",
              parts: [{ text: conversationHistory + prompt }],
            },
          ],
        })

        const result = await chat.sendMessage(input)
        generatedText = await result.response.text()
        generatedText = generatedText.replace(/\* /g, "\n")
      } else {
        const transcriptText = transcript.map((t) => t.text).join(" ")

        const conversationHistory = conversation
          .map((msg) => `${msg.role === "user" ? "Human" : "AI"}: ${msg.content}`)
          .join("\n")

        const prompt = `
          Conversation history:
          ${conversationHistory}

          if there is something about who you created or built is specified below then say "I was built by The Vanguards" only if they ask, if not then dont mention this.
           You are a Socratic teacher.
          Engage in a thoughtful dialogue with the user, asking questions one by one to help them discover knowledge on their own.
          The question is: ${input}
          ${fileContent ? `Consider this additional context from the uploaded document: ${fileContent}` : ""}
          ${transcriptText ? `Consider this as a transcript of a YouTube video: ${transcriptText}` : ""}
          Your response:
        `

        const response = await fetch("/api/getData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: prompt,
            query: input,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to fetch data from the API")
        }

        const data = await response.json()
        generatedText = data.chatContent
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" })

        const image_prompt = `give a one word that can describe this sentence for image generation. remeber this sentence is using socratic method to teach so give the word for the content its trying to explain: ${generatedText}. the input given was :${input}`

        const result = await model.generateContent(image_prompt)
        console.log(result.response.text())
        const response1 = await fetch("/api/getData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: prompt,
            query: await result.response.text(),
          }),
        })

        if (!response1.ok) {
          console.error("Failed to fetch data from /api/getData", await response1.text())
          throw new Error("Failed to fetch data from /api/getData")
        }

        const data1 = await response1.json()

        imageUrl = data1.imageUrl
      }

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
        { role: "ai", content: generatedText, imageUrl },
      ])

      speakText(generatedText)
    } catch (error) {
      console.error("Error generating response:", error)
      const errorMessage =
        "I apologize, I'm having trouble thinking right now. Could you please rephrase your question?"
      setConversation((prev) => [
        ...prev,
        {
          role: "ai",
          content: errorMessage,
          imageUrl: "https://via.placeholder.com/150?text=Error",
        },
      ])
      speakText(errorMessage)
    }
    setIsThinking(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value)
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

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer()
        const result = await mammoth.extractRawText({ arrayBuffer })
        setFileContent(result.value)
        alert("File uploaded successfully!")
      } catch (error) {
        console.error("Error reading file:", error)
        alert("Error reading file. Please try again.")
      }
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  async function toggleSubmit() {
    setInterrupted(true)
    if (!videoId) {
      setError("Please enter a YouTube video ID")
      return
    }
    try {
      const response = await fetch(`/api/getTranscript?videoId=${videoId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch transcript")
      }
      const data = await response.json()
      setTranscript(data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching transcript:", err)
      setError(err.message || "An error occurred")
    }
  }

  const toggleListening = () => {
    setIsListening(!isListening)
  }

  const fetchTranscript = async () => {
    if (!videoId) {
      setError("Please enter a YouTube video ID")
      return
    }
    try {
      const response = await fetch(`/api/getTranscript?videoId=${videoId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch transcript")
      }
      const data = await response.json()
      setTranscript(data)
      setError(null)
    } catch (err: any) {
      console.error("Error fetching transcript:", err)
      setError(err.message || "An error occurred")
    }
  }

  return (
    <div
      className={`relative h-screen flex transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-[#2C2A4A] to-gray-900"
          : "bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FFFF]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C2A4A]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00FFFF]/10 rounded-full animate-spin"
          style={{ animationDuration: "30s" }}
        ></div>
      </div>

      {/* Sidebar */}
      <div className="hidden md:flex h-screen relative z-10">
        <VerticalNavbar />
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex h-screen flex-col justify-start items-center transition-all duration-500 relative z-10 ${
          showGraph ? "md:w-2/3" : "md:w-full"
        }`}
      >
        <div className="w-full mt-4 md:mt-10 max-w-4xl rounded-2xl shadow-2xl overflow-hidden p-4 md:p-6">
          {/* Header */}
          <div
            className={`rounded-t-2xl p-6 backdrop-blur-md border ${
              isDarkMode ? "bg-gray-800/90 border-gray-700" : "bg-white/90 border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  <span className="bg-gradient-to-r from-[#00FFFF] to-white bg-clip-text text-transparent">
                    Dialogic
                  </span>{" "}
                  AI Teacher
                </h1>
                <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Socratic learning powered by MetaLearn
                </p>
              </div>

              {/* AI Mode Selector */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select
                    value={selectedLLM}
                    onChange={(e) => setSelectedLLM(e.target.value as "gemini" | "api")}
                    className={`appearance-none px-4 py-2 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] ${
                      isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="gemini">Dialogic Basic</option>
                    <option value="api">Dialogic Advanced</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-[#00FFFF]" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full transition-all duration-300 ${
                    isDarkMode ? "bg-[#00FFFF]/20 text-[#00FFFF]" : "bg-[#2C2A4A]/10 text-[#2C2A4A]"
                  } hover:scale-110`}
                >
                  {isDarkMode ? "☀️" : "🌙"}
                </button>
              </div>
            </div>
          </div>

          {/* Chat Container */}
          <div
            className={`backdrop-blur-md border-x border-b rounded-b-2xl ${
              isDarkMode ? "bg-gray-800/50 border-gray-700" : "bg-white/50 border-gray-200"
            }`}
          >
            {/* Messages Area */}
            <div className="h-[calc(100vh-24rem)] md:h-[calc(100vh-22rem)] overflow-y-auto p-6 space-y-4">
              {conversation.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-6 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <span className="text-3xl">🧠</span>
                    </div>
                    {/* Orbiting Agent */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#00FFFF] rounded-full flex items-center justify-center text-white text-xs">
                        🤖
                      </div>
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    Welcome to Dialogic
                  </h3>
                  <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Start your Socratic learning journey by asking a question!
                  </p>
                </div>
              ) : (
                conversation.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white"
                          : isDarkMode
                            ? "bg-gray-700 text-white border border-gray-600"
                            : "bg-white text-gray-900 border border-gray-200"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content.split("\n").map((line, i) => (
                          <div key={i} className="mb-1">
                            {line}
                          </div>
                        ))}
                      </div>
                      {message.imageUrl && (
                        <img
                          src={message.imageUrl || "/placeholder.svg"}
                          alt="Generated"
                          className="mt-3 max-w-full h-auto rounded-lg shadow-md"
                        />
                      )}
                    </div>
                  </div>
                ))
              )}

              {/* Thinking Indicator */}
              {isThinking && (
                <div className="flex justify-start">
                  <div
                    className={`p-4 rounded-2xl shadow-lg ${
                      isDarkMode ? "bg-gray-700 border border-gray-600" : "bg-white border border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#00FFFF] rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-[#00FFFF] rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-[#00FFFF] rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                        AI is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 border-t border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Main Input Row */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={userInput}
                      onChange={handleInputChange}
                      className={`w-full px-6 py-4 rounded-2xl border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="What would you like to explore today?"
                    />
                  </div>

                  {/* Voice Input Button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                      isListening
                        ? "bg-red-500 text-white shadow-lg shadow-red-500/25"
                        : "bg-[#00FFFF] text-white shadow-lg shadow-[#00FFFF]/25"
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={isThinking || !userInput.trim()}
                    className="bg-[#00FFFF] text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Send
                  </button>
                </div>

                {/* Advanced Features Row */}
                {selectedLLM === "api" && (
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={videoId}
                      onChange={(e) => setVideoId(e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] ${
                        isDarkMode
                          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                      }`}
                      placeholder="YouTube video link (optional)"
                    />

                    <button
                      type="button"
                      onClick={triggerFileUpload}
                      className={`p-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept=".docx"
                      className="hidden"
                    />
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Graph Panel */}
      <div className="md:flex flex-col h-screen relative z-10">
        <div
          className={`top-0 right-0 h-auto transition-all duration-500 ${
            showGraph ? "h-screen w-full md:w-96" : "h-0"
          }`}
        >
          <button
            onClick={() => setShowGraph(!showGraph)}
            className="absolute w-32 top-5 right-5 z-10 bg-[#00ffff73] text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105"
          >
            {showGraph ? "Hide Graph" : "Show Graph"}
          </button>
          <div
            className={`transition-all duration-500 ${
              showGraph ? "opacity-100" : "opacity-0"
            } w-full h-full bg-white overflow-hidden rounded-l-2xl shadow-2xl`}
          >
            {showGraph && (
              <div className="w-full h-full">
                <DynamicDesmosCalculator expressions={expressions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
