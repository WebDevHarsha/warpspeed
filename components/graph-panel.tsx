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
    <div className="relative h-screen z-10">
      {/* Toggle Button */}
      <div className="absolute top-4 right-4 z-20">
        <Button
          onClick={() => setShowGraph(!showGraph)}
          variant="secondary"
          className="text-sm px-4 py-2 rounded-lg shadow-md"
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
      </div>

      {/* Sliding Graph Panel */}
      <div
        className={`absolute top-0 right-0 h-full transition-all duration-500 ease-in-out ${
          showGraph ? "w-full md:w-96" : "w-0"
        } overflow-hidden`}
      >
        <div className="w-full h-full bg-background border-l rounded-l-2xl shadow-xl transition-opacity duration-500 ease-in-out opacity-100">
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
