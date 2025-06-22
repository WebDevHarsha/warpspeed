"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import {
  Brain,
  Sparkles,
  ArrowRight,
  Zap,
  Stars,
  CircuitBoard,
  BookOpen,
  Lightbulb,
  Target,
} from "lucide-react"
import { useState, useEffect, MouseEvent } from "react"
import TellaEmbed from "./Vide"

interface Particle {
  left: string
  top: string
  animationDelay: string
  animationDuration: string
}

interface Ripple {
  x: number
  y: number
  id: number
}

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  gradient: string
  delay?: number
}

interface CTAButtonProps {
  href?: string
  children: React.ReactNode
  variant?: "primary" | "outline"
}

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const generated = Array.from({ length: 20 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    }))
    setParticles(generated)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/6 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 dark:from-cyan-400/10 dark:to-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/6 w-80 h-80 bg-gradient-to-r from-indigo-500/15 to-purple-500/15 dark:from-indigo-400/8 dark:to-purple-400/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 dark:from-teal-400/5 dark:to-cyan-400/5 rounded-full blur-2xl animate-pulse delay-2000"></div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className="w-[800px] h-[800px] border border-cyan-500/20 dark:border-cyan-400/10 rounded-full animate-spin opacity-30"
          style={{ animationDuration: "30s" }}
        />
        <div
          className="absolute inset-16 border border-indigo-500/20 dark:border-indigo-400/10 rounded-full animate-spin opacity-40"
          style={{ animationDuration: "25s", animationDirection: "reverse" }}
        />
        <div
          className="absolute inset-32 border border-blue-500/30 dark:border-blue-400/15 rounded-full animate-spin opacity-50"
          style={{ animationDuration: "20s" }}
        />
      </div>

      <div className="absolute inset-0">
        {particles.map((style, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 dark:bg-cyan-300 rounded-full animate-pulse"
            style={style}
          />
        ))}
      </div>
    </div>
  )
}

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="w-40 h-40 mx-auto relative group cursor-pointer transform transition-all duration-500 hover:scale-110"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full p-1 transition-all duration-300 ${
          isHovered ? "animate-spin shadow-2xl shadow-cyan-500/50" : "animate-pulse"
        }`}
      >
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-full flex items-center justify-center relative transition-colors duration-300">
          <Brain
            className={`w-16 h-16 transition-all duration-300 ${
              isHovered ? "text-cyan-500 scale-110" : "text-cyan-400 dark:text-cyan-300"
            }`}
          />
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "10s" }}>
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <CircuitBoard className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "15s", animationDirection: "reverse" }}>
            <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: "12s" }}>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <Stars className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const FeatureCard = ({ icon: Icon, title, description, gradient, delay = 0 }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <Card
      className={`bg-white/70 dark:bg-slate-800/30 border-slate-200 dark:border-slate-700/50 backdrop-blur-sm p-6 transition-all duration-500 group cursor-pointer transform hover:scale-105 hover:shadow-2xl animate-fade-in-up ${
        isHovered ? "shadow-xl" : ""
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center mb-4 transform transition-all duration-300 ${
        isHovered ? "scale-110 rotate-6" : ""
      }`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 transition-colors duration-300">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">{description}</p>
    </Card>
  )
}

const CTAButton = ({ href = "#", children, variant = "primary" }: CTAButtonProps) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      x,
      y,
      id: Math.random(),
    }

    setRipples((prev) => [...prev, newRipple])
    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id))
    }, 600)
  }

  const buttonContent = (
    <Button
      size="lg"
      className={`relative overflow-hidden px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 group ${
        variant === "primary"
          ? "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40"
          : "border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white backdrop-blur-sm bg-white/20 dark:bg-slate-800/20 hover:border-slate-400 dark:hover:border-slate-500"
      }`}
      onClick={handleClick}
    >
      {children}
      {variant === "primary" && (
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
      )}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={`absolute ${variant === "primary" ? "bg-white/30" : "bg-slate-400/30"} rounded-full animate-ping`}
          style={{
            left: ripple.x - 10,
            top: ripple.y - 10,
            width: 20,
            height: 20,
          }}
        />
      ))}
    </Button>
  )

  return variant === "primary" ? <Link href={href}>{buttonContent}</Link> : buttonContent
}

export default function HeroPage() {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }
    window.addEventListener("mousemove", handleMouseMove as any)
    return () => window.removeEventListener("mousemove", handleMouseMove as any)
  }, [])

  

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white overflow-hidden transition-colors duration-500 pt-20">
      <AnimatedBackground />
      
      {/* Mouse follower effect */}
      <div 
        className="fixed w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 dark:from-cyan-400/3 dark:to-blue-400/3 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out z-0"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      />

      <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-8 animate-fade-in-up">
            <Badge variant="secondary" className="bg-white/80 dark:bg-slate-800/50 text-cyan-600 dark:text-cyan-400 border-cyan-200 dark:border-cyan-500/30 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:scale-105 transition-transform duration-200 cursor-pointer">
              <Sparkles className="w-4 h-4 mr-2 animate-pulse" />
              Powered by AI Agents
            </Badge>
          </div>

          {/* Animated logo */}
          <div className="mb-12 relative animate-fade-in-up delay-200">
            <AnimatedLogo />
          </div>

          {/* Main heading */}
          <div className="mb-8 animate-fade-in-up delay-300">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              Rethink Learning.{" "}
              <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent animate-pulse">
                Forever.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mb-12 animate-fade-in-up delay-400">
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Powered by intelligent agents and ancient techniques, MetaLearn is a{" "}
              <span className="text-cyan-500 dark:text-cyan-400 font-semibold">living classroom</span>{" "}
              that learns with you.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16 animate-fade-in-up delay-500">
            <CTAButton href="/dialogic">
              Try It Now
            </CTAButton>
            <CTAButton variant="outline">
              How It Works
            </CTAButton>
          </div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in-up delay-600">
            <FeatureCard
              icon={Brain}
              title="AI-Powered"
              description="Intelligent agents adapt to your learning style and pace"
              gradient="from-cyan-500 to-blue-500"
              delay={100}
            />
            
            <FeatureCard
              icon={CircuitBoard}
              title="Adaptive"
              description="Content evolves based on your progress and interests"
              gradient="from-indigo-500 to-purple-500"
              delay={200}
            />
            
            <FeatureCard
              icon={Stars}
              title="Personalized"
              description="Every learning journey is unique and tailored to you"
              gradient="from-teal-500 to-cyan-500"
              delay={300}
            />
          </div>

          {/* Additional feature cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
            <FeatureCard
              icon={BookOpen}
              title="Interactive"
              description="Engage with content through dynamic dialogues and exercises"
              gradient="from-emerald-500 to-teal-500"
              delay={400}
            />
            
            <FeatureCard
              icon={Lightbulb}
              title="Insightful"
              description="Gain deep understanding through Socratic questioning"
              gradient="from-amber-500 to-orange-500"
              delay={500}
            />
            
            <FeatureCard
              icon={Target}
              title="Goal-Oriented"
              description="Track progress and achieve learning objectives efficiently"
              gradient="from-rose-500 to-pink-500"
              delay={600}
            />
          </div>
        </div>
      </section>
        <TellaEmbed />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  )
}



