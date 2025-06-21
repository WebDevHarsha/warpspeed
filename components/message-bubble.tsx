"use client"

import type { Message } from "@/types"

interface MessageBubbleProps {
  message: Message
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user"

  return (
    <div className={`flex px-2 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg px-4 py-2 text-sm max-w-[80%] whitespace-pre-wrap
          ${isUser
            ? "bg-green-500 text-white dark:bg-green-600"
            : "bg-gray-200 text-black dark:bg-zinc-800 dark:text-white"
          }`}
      >
        {message.content.split("\n").map((line, i) => (
          <div key={i} className="mb-1">
            {line}
          </div>
        ))}
        {message.imageUrl && (
          <img
            src={message.imageUrl || "/placeholder.svg"}
            alt="Generated"
            className="mt-2 max-w-full h-auto rounded-md"
          />
        )}
      </div>
    </div>
  )
}

export default MessageBubble
