"use client"
import VerticalNavbar from "@/components/vertical-navbar"
import { ReactNode } from "react"
import { SessionProvider } from "next-auth/react"
import Providers from "@/lib/Provider"
import { Toaster } from "react-hot-toast"

export default function SidebarLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background text-foreground">
        <div className="hidden md:block">
          <VerticalNavbar />
        </div>

        <div className="flex-1 overflow-hidden">
          <Providers>
        <Toaster/>
          {children}
        </Providers>
        </div>
      </div>
    </SessionProvider>
  )
}
