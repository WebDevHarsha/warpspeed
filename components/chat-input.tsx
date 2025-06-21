"use client"

import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mic, MicOff, Send, Upload, Paperclip } from "lucide-react"

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
  const [showAttachments, setShowAttachments] = useState(false)

  return (
    <div className="p-2 border-t bg-background">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1"
          />

          <Button type="button" size="icon" variant="ghost" onClick={toggleListening}>
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <Button type="submit" size="icon" disabled={isThinking || !userInput.trim()}>
            <Send className="h-4 w-4" />
          </Button>

          <Button type="button" size="icon" variant="ghost" onClick={() => setShowAttachments((prev) => !prev)}>
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>

        {/* Expandable Attachments Section */}
        {showAttachments && (
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              value={videoId}
              onChange={(e) => setVideoId(e.target.value)}
              placeholder="YouTube video link"
              className="flex-1"
            />

            <Button type="button" size="icon" variant="outline" onClick={triggerFileUpload}>
              <Upload className="h-4 w-4" />
            </Button>

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
  )
}

export default ChatInput
