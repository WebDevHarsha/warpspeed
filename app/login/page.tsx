"use client"

import type React from "react"
import { signIn } from "next-auth/react";

import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Login submitted:", formData)
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 backdrop-blur-md ${isDarkMode ? "bg-gray-900/80" : "bg-white/80"} border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] bg-clip-text text-transparent"
          >
            MetaLearn
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? "bg-[#00FFFF]/20 text-[#00FFFF]" : "bg-[#2C2A4A]/10 text-[#2C2A4A]"} hover:scale-110`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <Link
              href="/signup"
              className={`hover:text-[#00FFFF] transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className={`min-h-screen flex items-center justify-center relative overflow-hidden pt-20 ${isDarkMode ? "bg-gradient-to-br from-gray-900 via-[#2C2A4A] to-gray-900" : "bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]"}`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#00FFFF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#2C2A4A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#00FFFF]/20 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        <div className="max-w-md w-full mx-auto px-6 relative z-10">
          {/* Login Card */}
          <div
            className={`p-8 rounded-2xl shadow-2xl backdrop-blur-sm ${isDarkMode ? "bg-gray-800/90 border border-gray-700" : "bg-white/90 border border-gray-200"}`}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full animate-pulse"></div>
                <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                {/* Orbiting Agent */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#00FFFF] rounded-full flex items-center justify-center text-white text-xs">
                    🤖
                  </div>
                </div>
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>Welcome Back</h1>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Continue your learning journey</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  placeholder="Enter your password"
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-[#00FFFF] border-gray-300 rounded focus:ring-[#00FFFF] focus:ring-2"
                  />
                  <label htmlFor="rememberMe" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-[#00FFFF] hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105 transform"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className={`flex-1 border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}></div>
              <span className={`px-4 text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>or</span>
              <div className={`flex-1 border-t ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}></div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">

              <button
                type="button"
                onClick={() => signIn("google")}
                className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg transition-all duration-300 hover:scale-105 ${isDarkMode
                    ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  {/* SVG paths unchanged */}
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>


              <button
                type="button"
                className={`w-full flex items-center justify-center px-4 py-3 border rounded-lg transition-all duration-300 hover:scale-105 ${isDarkMode ? "border-gray-600 bg-gray-700 text-white hover:bg-gray-600" : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"}`}
              >
                <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.083.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.017.001z" />
                </svg>
                Continue with GitHub
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Don't have an account?{" "}
                <Link href="/signup" className="text-[#00FFFF] hover:underline font-medium">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
