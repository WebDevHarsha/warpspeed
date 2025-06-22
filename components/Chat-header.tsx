"use client"

import { CardHeader } from "@/components/ui/card"

const ChatHeader = () => {
  return (
    <CardHeader className="p-2 bg-background/90 backdrop-blur-sm border-b">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg md:text-2xl font-semibold leading-tight">
          <span className="bg-gradient-to-r from-cyan-400 to-foreground bg-clip-text text-transparent">
            Socratic
          </span>{" "}
          AI Teacher
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">
          Socratic-style learning assistant powered by MetaLearn Engine
        </p>
      </div>
    </CardHeader>
  )
}

export default ChatHeader
