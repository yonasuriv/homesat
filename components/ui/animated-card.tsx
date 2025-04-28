"use client"

import type React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  iconClassName?: string
  icon?: React.ReactNode
  title: string
  description: string
}

export function AnimatedCard({
  children,
  className,
  iconClassName,
  icon,
  title,
  description,
  ...props
}: AnimatedCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-lg border border-neutral-800 bg-black p-6 transition-all duration-300",
        hovered && "border-neutral-700 bg-neutral-900/50",
        className,
      )}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {icon && <div className={cn("mb-4 rounded-full bg-neutral-800/50 p-3 w-fit", iconClassName)}>{icon}</div>}
      <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
      <p className="mb-4 text-sm text-neutral-400">{description}</p>
      {children}
    </motion.div>
  )
}
