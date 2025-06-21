"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Home, Brain, BookOpen, Moon, Settings, User } from "lucide-react"

const VerticalNavbar = () => {
  const navItems = [
    { href: "/", icon: Home, label: "Home", active: false },
    { href: "/dialogic", icon: Brain, label: "Dialogic Chat", active: true },
    { href: "#", icon: BookOpen, label: "Learning Paths", active: false },
    { href: "#", icon: Moon, label: "Sleep Learning", active: false },
    { href: "#", icon: Settings, label: "Settings", active: false },
  ]

  return (
    <Card className="w-64 h-full rounded-none border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <CardHeader className="p-6 border-b">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-foreground bg-clip-text text-transparent">
          MetaLearn
        </div>
        <div className="text-sm text-muted-foreground">Dialogic AI</div>
      </CardHeader>

      <CardContent className="flex-1 p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Navigation</div>

        {navItems.map((item) => (
          <Button
            key={item.href}
            variant={item.active ? "default" : "ghost"}
            className={`w-full justify-start space-x-3 ${
              item.active
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            asChild
          >
            <a href={item.href}>
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          </Button>
        ))}

        <div className="pt-4 mt-auto">
          <Card className="p-3 bg-muted/50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-cyan-400 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <div className="text-sm font-medium">Student</div>
                <div className="text-xs text-muted-foreground">Learning Mode</div>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default VerticalNavbar
