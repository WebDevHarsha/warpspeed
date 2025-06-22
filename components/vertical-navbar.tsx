"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Home, Brain, BookOpen, Moon, Settings, User } from "lucide-react"

const VerticalNavbar = () => {
  const { data: session } = useSession()

  const navItems = [
    { href: "/", icon: Home, label: "Home", active: false },
    { href: "/dialogic", icon: Brain, label: "Dialogic Chat", active: true },
    { href: "/learning-paths", icon: BookOpen, label: "Learning Paths", active: false },
    { href: "/sleepai", icon: Moon, label: "Sleep Learning", active: false },
    { href: "/settings", icon: Settings, label: "Settings", active: false },
  ]

  return (
    <Card className="w-64 h-full rounded-none bg-background/90 backdrop-blur-sm shadow-none border-none flex flex-col">
      <CardHeader className="p-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-foreground bg-clip-text text-transparent">
          MetaLearn
        </div>
        <div className="text-sm text-muted-foreground">Dialogic AI</div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-2 flex flex-col space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Navigation
        </div>

        {navItems.map((item, index) => (
          <Button
            key={`${item.href}-${index}`}
            variant="ghost"
            className={`w-full justify-start space-x-3 transition-all ${
              item.active
                ? "bg-cyan-500/15 text-cyan-400"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
            asChild
          >
            <Link href={item.href} className="flex items-center space-x-3">
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </Button>
        ))}

        <div className="mt-auto pt-6">
          <Card className="p-3 bg-muted/40 shadow-none border-none">
            <div className="flex items-center space-x-3">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User"
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-cyan-400 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div>
                <div className="text-sm font-medium">
                  {session?.user?.name || "Anonymous"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {session?.user?.email || "Not signed in"}
                </div>
              </div>
            </div>

            {session && (
              <Button
                variant="link"
                className="text-xs text-muted-foreground px-0 pt-1"
                onClick={() => signOut()}
              >
                Sign out
              </Button>
            )}
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}

export default VerticalNavbar
