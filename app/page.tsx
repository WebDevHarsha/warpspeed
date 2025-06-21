"use client"

import { useState } from "react"


export default function HomePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${isDarkMode ? "bg-gray-900" : "bg-white"}`}>
      {/* Navigation */}
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

      {/* Hero Section */}
      <section
        className={`min-h-screen p-32 flex items-center justify-center relative overflow-hidden ${isDarkMode ? "bg-gradient-to-br from-gray-900 via-[#2C2A4A] to-gray-900" : "bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5]"}`}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FFFF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C2A4A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00FFFF]/20 rounded-full animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#2C2A4A]/20 rounded-full animate-spin"
            style={{ animationDuration: "15s", animationDirection: "reverse" }}
          ></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          {/* 3D Brain/Agent Visualization */}
          <div className="mb-12 relative">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-4xl">🧠</span>
              </div>
              {/* Orbiting Agents */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#00FFFF] rounded-full flex items-center justify-center text-white text-xs">
                  🤖
                </div>
              </div>
              <div
                className="absolute inset-0 animate-spin"
                style={{ animationDuration: "12s", animationDirection: "reverse" }}
              >
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-[#2C2A4A] rounded-full flex items-center justify-center text-white text-xs">
                  🌙
                </div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s" }}>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full flex items-center justify-center text-white text-xs">
                  💭
                </div>
              </div>
            </div>
          </div>

          <h1 className={`text-6xl md:text-8xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Rethink Learning.{" "}
            <span className="bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] bg-clip-text text-transparent">Forever.</span>
          </h1>

          <p
            className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            Powered by intelligent agents and ancient techniques, MetaLearn is a living classroom that learns with you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105 transform">
              Try It Now
            </button>
            <button
              className={`border-2 border-[#00FFFF] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 transform ${isDarkMode ? "text-[#00FFFF] hover:bg-[#00FFFF] hover:text-gray-900" : "text-[#2C2A4A] hover:bg-[#00FFFF] hover:text-white"}`}
            >
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* Method Spotlight */}
      <section className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-5xl font-bold text-center mb-16 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Revolutionary Learning Methods
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🧠",
                title: "Socratic Dialogues",
                description:
                  "AI mentors guide you through thought-provoking questions, unlocking deeper understanding through ancient wisdom.",
              },
              {
                icon: "🌙",
                title: "Sleep Learning",
                description:
                  "Harness your subconscious mind with scientifically-designed dream modules that reinforce learning while you rest.",
              },
              {
                icon: "🤖",
                title: "Agent-Guided Tutorials",
                description:
                  "Personalized AI agents adapt to your learning style, creating unique pathways tailored just for you.",
              },
              {
                icon: "🎮",
                title: "Simulation Learning",
                description:
                  "Immersive virtual environments where you can practice skills and explore concepts in risk-free simulations.",
              },
            ].map((method, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer ${isDarkMode ? "bg-gray-900 hover:bg-gradient-to-br hover:from-[#2C2A4A] hover:to-gray-900" : "bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#F5F5F5]"} shadow-lg hover:shadow-2xl hover:shadow-[#00FFFF]/10`}
              >
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {method.icon}
                </div>
                <h3
                  className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"} group-hover:text-[#00FFFF] transition-colors`}
                >
                  {method.title}
                </h3>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                  {method.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className={`py-20 ${isDarkMode ? "bg-gradient-to-r from-gray-900 to-[#2C2A4A]" : "bg-gradient-to-r from-white to-[#F5F5F5]"}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 className={`text-5xl font-bold text-center mb-16 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Your Learning Journey
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#2C2A4A] to-[#00FFFF]"></div>

            <div className="space-y-16">
              {[
                {
                  step: "01",
                  title: "Choose Your Mind Mentor",
                  description:
                    "Select from our diverse collection of AI agents, each specialized in different learning methodologies and subjects.",
                  position: "left",
                },
                {
                  step: "02",
                  title: "Experience Your Dream Module",
                  description:
                    "Engage with immersive learning experiences that work with your natural sleep cycles and subconscious processing.",
                  position: "right",
                },
                {
                  step: "03",
                  title: "Engage in Reflective Dialogue",
                  description:
                    "Participate in Socratic conversations that challenge your assumptions and deepen your understanding.",
                  position: "left",
                },
                {
                  step: "04",
                  title: "Master Through Simulation",
                  description:
                    "Apply your knowledge in realistic virtual environments designed to reinforce learning through practice.",
                  position: "right",
                },
              ].map((item, index) => (
                <div key={index} className={`flex items-center ${item.position === "right" ? "flex-row-reverse" : ""}`}>
                  <div className={`w-1/2 ${item.position === "right" ? "pl-12" : "pr-12"}`}>
                    <div
                      className={`p-8 rounded-2xl ${isDarkMode ? "bg-gray-800" : "bg-white"} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                    >
                      <div className="text-[#00FFFF] text-6xl font-bold mb-4">{item.step}</div>
                      <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {item.title}
                      </h3>
                      <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-[#00FFFF] rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={`py-20 ${isDarkMode ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className={`text-5xl font-bold text-center mb-16 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Visionary Voices
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Elena Vasquez",
                title: "Cognitive Neuroscientist",
                avatar: "👩‍🔬",
                quote:
                  "MetaLearn represents the future of education. The integration of sleep learning with AI agents is revolutionary.",
              },
              {
                name: "Prof. Marcus Chen",
                title: "Educational Futurist",
                avatar: "👨‍🎓",
                quote:
                  "I've never seen students engage so deeply with material. The Socratic method enhanced by AI is transformative.",
              },
              {
                name: "Dr. Aria Blackwood",
                title: "Learning Sciences Pioneer",
                avatar: "👩‍💻",
                quote:
                  "This platform doesn't just teach - it evolves with each learner, creating truly personalized educational experiences.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`p-8 rounded-2xl ${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105`}
              >
                <div className="text-6xl mb-6">{testimonial.avatar}</div>
                <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"} mb-6 italic text-lg leading-relaxed`}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <h4 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {testimonial.name}
                  </h4>
                  <p className="text-[#00FFFF] font-medium">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className={`py-20 ${isDarkMode ? "bg-gradient-to-r from-[#2C2A4A] to-gray-900" : "bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF]"}`}
      >
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Your journey to post-human learning begins now.
          </h2>
          <p className="text-xl text-gray-200 mb-12 leading-relaxed">
            Join thousands of learners who are already experiencing the future of education.
          </p>
          <button className="bg-white text-[#2C2A4A] px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-white/25 transition-all duration-300 hover:scale-110 transform">
            Start Your Transformation
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] bg-clip-text text-transparent mb-4 md:mb-0">
              MetaLearn
            </div>
            <div className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"} text-center md:text-right`}>
              <p className="mb-2">© 2024 MetaLearn. Redefining human potential.</p>
              {/* Easter Egg - Socrates Quote in Greek */}
              <p
                className="text-xs opacity-50 hover:opacity-100 transition-opacity cursor-help"
                title="The only true wisdom is in knowing you know nothing - Socrates"
              >
                ἓν οἶδα ὅτι οὐδὲν οἶδα
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
