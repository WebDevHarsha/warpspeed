"use client"
import React from 'react'
import { useState } from "react"

function Navigate() {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode)
    }
    return (
        <nav
            className={`fixed top-0 w-full z-50 backdrop-blur-md ${isDarkMode ? "bg-gray-900/80" : "bg-white/80"} border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] bg-clip-text text-transparent">
                    MetaLearn
                </div>
                <div className="hidden md:flex space-x-8">
                    <a
                        href="#"
                        className={`hover:text-[#00FFFF] transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                        Platform
                    </a>
                    <a
                        href="#"
                        className={`hover:text-[#00FFFF] transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                        Methods
                    </a>
                    <a
                        href="#"
                        className={`hover:text-[#00FFFF] transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                        Research
                    </a>
                    <a
                        href="#"
                        className={`hover:text-[#00FFFF] transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                    >
                        About
                    </a>
                </div>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={toggleDarkMode}
                        className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? "bg-[#00FFFF]/20 text-[#00FFFF]" : "bg-[#2C2A4A]/10 text-[#2C2A4A]"} hover:scale-110`}
                    >
                        {isDarkMode ? "☀️" : "🌙"}
                    </button>
                    <a href="/signup">
                        <button className="bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105">
                            Sign In
                        </button>
                    </a>

                </div>
            </div>
        </nav>

    )
}

export default Navigate