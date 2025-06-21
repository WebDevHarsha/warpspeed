"use client"

import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import type { Expression } from "@/types"

const DynamicDesmosCalculator = dynamic(() => import("@/components/ui/DesmosCalculator"), {
  ssr: false,
})

interface GraphPanelProps {
  showGraph: boolean
  setShowGraph: (show: boolean) => void
  expressions: Expression[]
}

const GraphPanel = ({ showGraph, setShowGraph, expressions }: GraphPanelProps) => {
  return (
    <div className="md:flex flex-col h-screen relative z-10">
      <div
        className={`top-0 right-0 h-auto transition-all duration-500 ${showGraph ? "h-screen w-full md:w-96" : "h-0"}`}
      >
        <Button
          onClick={() => setShowGraph(!showGraph)}
          className="absolute w-32 top-5 right-5 z-10 bg-cyan-400/70 hover:bg-cyan-500/70 text-white rounded-lg transition-all duration-300 hover:scale-105"
        >
          {showGraph ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" />
              Hide Graph
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" />
              Show Graph
            </>
          )}
        </Button>
        <div
          className={`transition-all duration-500 ${
            showGraph ? "opacity-100" : "opacity-0"
          } w-full h-full bg-background overflow-hidden rounded-l-2xl shadow-2xl border-l`}
        >
          {showGraph && (
            <div className="w-full h-full">
              <DynamicDesmosCalculator expressions={expressions} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GraphPanel
