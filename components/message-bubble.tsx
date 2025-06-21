"use client"

import { Card, CardContent } from "@/components/ui/card"
import type { Message } from "@/types"

interface MessageBubbleProps {
  message: Message
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <Card
        className={`max-w-[80%] ${
          message.role === "user"
            ? "bg-gradient-to-r from-primary to-cyan-400 text-primary-foreground border-0"
            : "bg-card border"
        }`}
      >
        <CardContent className="p-4">
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
        </CardContent>
      </Card>
    </div>
  )
}

export default MessageBubble
