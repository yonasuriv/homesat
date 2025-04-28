"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type React from "react"

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description: string
  children?: React.ReactNode
}

export function FeatureCard({ title, description, children, className, ...props }: FeatureCardProps) {
  return (
    <motion.div
      className={cn("group relative overflow-hidden rounded-xl border border-neutral-800 bg-black p-2", className)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ scale: 1.02 }}
      {...props}
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:14px_14px]"></div>

      {/* Glowing border effect */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-[-1px] rounded-xl bg-[linear-gradient(to_right,#0ea5e9,#6366f1)] opacity-20"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Illustration */}
        <div className="mb-6 h-[180px] w-full overflow-hidden rounded-lg bg-neutral-900/50">{children}</div>

        {/* Content */}
        <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
    </motion.div>
  )
}
