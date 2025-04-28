"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CommandLineProps {
  command: string
  className?: string
}

export function CommandLine({ command, className }: CommandLineProps) {
  const [displayedCommand, setDisplayedCommand] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= command.length) {
        setDisplayedCommand(command.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [command])

  return (
    <div className={cn("rounded-lg border border-neutral-800 bg-black p-4 font-mono text-sm", className)}>
      <div className="flex items-center">
        <span className="mr-2 text-neutral-500">$</span>
        <span className="text-neutral-300">{displayedCommand}</span>
        {cursorVisible && <span className="ml-0.5 h-4 w-2 bg-white" />}
      </div>
    </div>
  )
}
