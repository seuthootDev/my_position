"use client"

import type React from "react"
import { motion } from "framer-motion"
import { AppCard } from "./carousel-card"

const noScrollbarCSS = `
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`

interface CarouselProps {
  items: Array<{
    Icon: React.ElementType
    title: string
    description: string
    action: () => void
  }>
}

export const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <>
      <style>{noScrollbarCSS}</style>
      <div className="relative w-full max-w-5xl p-4 sm:p-8 rounded-3xl bg-white/30 backdrop-blur-xl">
        <div className="flex justify-center">
          <motion.div
            className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 no-scrollbar"
            style={{ scrollSnapType: "x mandatory", msOverflowStyle: "none", scrollbarWidth: "none" }}
          >
            {items.map((item, index) => (
              <motion.div 
                key={index} 
                className="flex-shrink-0 w-full sm:w-auto" 
                style={{ scrollSnapAlign: "center" }}
              >
                <AppCard Icon={item.Icon} title={item.title} description={item.description} onClick={item.action} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  )
}

