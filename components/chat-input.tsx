"use client"

import type React from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, Upload } from "lucide-react"

interface ChatInputProps {
  userInput: string
  setUserInput: (value: string) => void
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void
  isThinking: boolean
  isListening: boolean
  toggleListening: () => void
  videoId: string
  setVideoId: (value: string) => void
  triggerFileUpload: () => void
  fileInputRef: React.RefObject<HTMLInputElement>
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void
}

const ChatInput = ({
  userInput,
  setUserInput,
  handleSubmit,
  isThinking,
  isListening,
  toggleListening,
  videoId,
  setVideoId,
  triggerFileUpload,
  fileInputRef,
  handleFileUpload,
}: ChatInputProps) => {
  return (
    <div className="p-2 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <Input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full px-6 py-4 h-auto rounded-2xl border-2 focus:border-cyan-400 transition-all duration-300"
              placeholder="What would you like to explore today?"
            />
          </div>

          <Button
            type="button"
            onClick={toggleListening}
            size="icon"
            className={`h-12 w-12 rounded-2xl transition-all duration-300 hover:scale-105 ${
              isListening ? "bg-red-500 hover:bg-red-600 text-white" : "bg-cyan-400 hover:bg-cyan-500 text-white"
            }`}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>

          <Button
            type="submit"
            disabled={isThinking || !userInput.trim()}
            className="bg-cyan-400 hover:bg-cyan-500 text-white px-8 py-4 h-12 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <Input
            type="text"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            className="flex-1 rounded-lg"
            placeholder="YouTube video link (optional)"
          />

          <Button
            type="button"
            onClick={triggerFileUpload}
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-lg"
          >
            <Upload className="h-4 w-4" />
          </Button>

          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".docx" className="hidden" />
        </div>
      </form>
    </div>
  )
}

export default ChatInput
