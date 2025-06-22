"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, LogOut, UserCircle } from "lucide-react"
import { ModeToggle } from "./ModeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Navigate() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen)

  const navItems = [
    { name: "Platform", href: "#platform" },
    { name: "Methods", href: "#methods" },
    { name: "Research", href: "#research" },
    { name: "About", href: "#about" },
  ]

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="text-2xl font-bold bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] bg-clip-text text-transparent">
            <Link href="/">MetaLearn</Link>
          </motion.div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <Link
                  href={item.href}
                  className="relative transition-colors duration-300 text-gray-700 dark:text-gray-300 hover:text-[#00FFFF] group"
                >
                  {item.name}
                  <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] group-hover:w-full transition-all duration-300" />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-4">
            <ModeToggle />

            {session ? (
              <div className="hidden md:flex items-center space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={session.user?.image || ""} alt={session.user?.name || "User"} />
                  <AvatarFallback>
                    <UserCircle className="w-5 h-5" />
                  </AvatarFallback>
                </Avatar>
                <Button variant="outline" onClick={() => signOut()}>
                  <LogOut className="w-4 h-4 mr-1" /> Sign out
                </Button>
              </div>
            ) : (
              <Button
                className="hidden md:block bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white"
                onClick={() => signIn("google", { callbackUrl: "/socratic" })}
              >
                Sign In
              </Button>
            )}

            {/* Mobile Menu */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu}>
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="md:hidden overflow-hidden">
              <motion.div className="py-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 + 0.2 }}>
                    <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="block py-2 px-4 rounded-lg transition-all duration-300 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                  {session ? (
                    <Button variant="destructive" className="w-full" onClick={() => signOut()}>
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </Button>
                  ) : (
                    <Button className="w-full bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white" onClick={() => signIn("google", { callbackUrl: "/socratic" })}>
                      Sign In
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

export default Navigate
