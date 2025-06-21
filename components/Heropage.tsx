"use client"

import { Button } from "@/components/ui/button"

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-all duration-500">
      <section className="min-h-screen p-32 flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#F5F5F5] via-white to-[#F5F5F5] dark:from-gray-900 dark:via-[#2C2A4A] dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#00FFFF]/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#2C2A4A]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#00FFFF]/20 rounded-full animate-spin" style={{ animationDuration: "20s" }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#2C2A4A]/20 rounded-full animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <div className="mb-12 relative">
            <div className="w-32 h-32 mx-auto mb-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-4xl">🧠</span>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "8s" }}>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#00FFFF] rounded-full flex items-center justify-center text-white text-xs">🤖</div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "12s", animationDirection: "reverse" }}>
                <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-8 bg-[#2C2A4A] rounded-full flex items-center justify-center text-white text-xs">🌙</div>
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s" }}>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] rounded-full flex items-center justify-center text-white text-xs">💭</div>
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gray-900 dark:text-white">
            Rethink Learning. <span className="bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] bg-clip-text text-transparent">Forever.</span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-600 dark:text-gray-300">
            Powered by intelligent agents and ancient techniques, MetaLearn is a living classroom that learns with you.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button className="bg-gradient-to-r from-[#2C2A4A] to-[#00FFFF] text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-[#00FFFF]/25 transition-all duration-300 hover:scale-105 transform">
              Try It Now
            </Button>
            <Button variant="outline" className="border-2 border-[#00FFFF] px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 transform text-[#2C2A4A] dark:text-[#00FFFF] hover:bg-[#00FFFF] hover:text-white dark:hover:text-gray-900">
              How It Works
            </Button>
          </div>
        </div>
      </section>

      
    </div>
  )
}
