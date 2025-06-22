"use client"

import { CardHeader } from "@/components/ui/card"

interface ChatHeaderProps {
  title?: string
  subtitle?: string
  highlight?: string // Tailwind color name like 'cyan', 'indigo', 'orange'
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = "AI Teacher",
  subtitle = "Socratic-style learning assistant powered by MetaLearn Engine",
  highlight = "cyan",
}) => {
  const [firstWord, ...rest] = title.split(" ")
  const gradient = `from-${highlight}-400 to-foreground`

  return (
    <CardHeader className="p-2 bg-background/90 backdrop-blur-sm border-b">
      <div className="flex flex-col gap-0.5">
        <h1 className="text-lg md:text-2xl font-semibold leading-tight">
          <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
            {firstWord}
          </span>{" "}
          {rest.join(" ")}
        </h1>
        <p className="text-xs md:text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </CardHeader>
  )
}

export default ChatHeader
