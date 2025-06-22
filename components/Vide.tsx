import React from 'react'

const TellaEmbed = () => {
  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-4 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-800 dark:text-white rounding-xl">
        Watch the Demo in Action 🎥
      </h2>
      <div className="aspect-video relative overflow-hidden rounded-lg shadow-lg">
        <iframe
          className="absolute top-0 left-0 w-full h-full border-0"
          src="https://www.tella.tv/video/cmc75sxwa00000cjr85gn0bnj/embed?b=0&title=0&a=0&loop=0&t=0&muted=0&wt=0"
          allowFullScreen
          allowTransparency
        />
      </div>
    </div>
  )
}

export default TellaEmbed



