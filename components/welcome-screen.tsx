"use client"

import { Brain } from "lucide-react"
import { type ReactNode } from "react"

interface WelcomeScreenProps {
  title?: string
  subtitle?: string
  emoji?: string
  highlightColor?: string // Tailwind color like 'cyan', 'indigo'
  icon?: ReactNode
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  title = "Welcome to Socratic",
  subtitle = "Begin your journey into Socratic learning — ask something thoughtful to get started.",
  emoji = "🤖",
  highlightColor = "cyan",
  icon = <Brain className="h-10 w-10 text-primary" />,
}) => {
  return (
    <div className="text-center py-16 px-4">
      {/* Animated Brain Logo */}
      <div className="relative w-24 h-24 mx-auto mb-6">
        {/* Pulsing Glow Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-${highlightColor}-400 to-primary rounded-full blur-xl opacity-30 animate-pulse`}
        />

        {/* Center Icon */}
        <div className="relative w-full h-full bg-background border border-muted rounded-full flex items-center justify-center shadow-inner">
          {icon}
        </div>

        {/* Orbiting Emoji */}
        <div className="absolute inset-0 animate-spin-slow">
          <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-${highlightColor}-400 text-white rounded-full text-xs flex items-center justify-center shadow-md`}>
            {emoji}
          </div>
        </div>
      </div>

      {/* Text Content */}
      <h3 className="text-2xl font-bold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">{subtitle}</p>
    </div>
  )
}

export default WelcomeScreen
