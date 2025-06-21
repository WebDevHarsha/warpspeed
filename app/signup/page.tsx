"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

export default function SignUpPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
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
    console.log("Form submitted:", formData)
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
              href="/login"
              className={`hover:text-[#00FFFF] transition-colors ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              Sign In
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FFFF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C2A4A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-md w-full mx-auto px-6 relative z-10">
          {/* Sign Up Card */}
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
              </div>
              <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                Join MetaLearn
              </h1>
              <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Begin your journey to post-human learning
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

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
                  placeholder="Create a password"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className={`block text-sm font-medium mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00FFFF] focus:border-transparent ${isDarkMode ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"}`}
                  placeholder="Confirm your password"
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleInputChange}
                  required
                  className="mt-1 w-4 h-4 text-[#00FFFF] border-gray-300 rounded focus:ring-[#00FFFF] focus:ring-2"
                />
                <label htmlFor="agreeToTerms" className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  I agree to the{" "}
                  <a href="#" className="text-[#00FFFF] hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#00FFFF] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105 transform"
              >
                Create Account
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                Already have an account?{" "}
                <Link href="/login" className="text-[#00FFFF] hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
