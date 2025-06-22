"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Home, Brain, BookOpen, Moon, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "./ModeToggle";

const VerticalNavbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/socratic", icon: Brain, label: "Socratic Chat" },
    { href: "/feynma", icon: BookOpen, label: "Feynman AI" },
    { href: "/sleepai", icon: Moon, label: "Sleep Learning" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const user = session?.user;
  const userInitial = user?.name?.charAt(0).toUpperCase();
  const fallbackImage = "/fallback-user.png";

  return (
    <Card className="w-64 h-full rounded-none bg-background/90 backdrop-blur-sm shadow-none border-none flex flex-col">
      <CardHeader className="p-6">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-foreground bg-clip-text text-transparent">
          MetaLearn
        </div>
        <div className="text-sm text-muted-foreground">socratic AI</div>
      </CardHeader>

      <CardContent className="flex-1 p-4 pt-2 flex flex-col space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Navigation
        </div>

        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Button
              key={`${item.href}-${index}`}
              variant="ghost"
              className={`w-full justify-start space-x-3 transition-all ${isActive
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
          );
        })}

        <div className="mt-auto pt-6">
          <Card className="p-3 bg-muted/40 shadow-none border-none space-y-3">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8 border">
                <AvatarImage
                  src={user?.image || fallbackImage}
                  alt={user?.name || "User"}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = fallbackImage;
                  }}
                />
                <AvatarFallback className="bg-gradient-to-r from-primary to-cyan-400 text-white font-medium text-sm">
                  {userInitial || <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="text-sm font-medium">
                  {user?.name || "Guest"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {user?.email || "Not signed in"}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <ModeToggle />
              {session ? (
                <Button
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  className="text-xs text-muted-foreground hover:text-foreground"
                  onClick={() => signIn("google", { callbackUrl: "/socratic" })}
                >
                  Sign in
                </Button>
              )}
            </div>
          </Card>
        </div>

      </CardContent>
    </Card>
  );
};

export default VerticalNavbar;
