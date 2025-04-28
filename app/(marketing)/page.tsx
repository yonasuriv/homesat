"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/ui/gradient-background"
import { AnimatedCard } from "@/components/ui/animated-card"
import { FeatureCard } from "@/components/ui/feature-card"
import { CommandLine } from "@/components/ui/command-line"
import { motion } from "framer-motion"
import { Home, Users, Calendar, ArrowRight } from "lucide-react"
import { FamilyManagementIllustration } from "@/components/illustrations/family-management"
import { ChoreSchedulingIllustration } from "@/components/illustrations/chore-scheduling"
import { PointsRewardsIllustration } from "@/components/illustrations/points-rewards"
import { TaskVerificationIllustration } from "@/components/illustrations/task-verification"
import { AreaManagementIllustration } from "@/components/illustrations/area-management"
import { AnalyticsDashboardIllustration } from "@/components/illustrations/analytics-dashboard"

export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-black text-white">
      <GradientBackground />

      <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-white" />
            <span className="text-xl font-bold">HomeTask</span>
          </div>
          <nav className="hidden md:flex gap-8">
            <Link href="#features" className="text-sm font-medium text-neutral-400 transition-colors hover:text-white">
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-neutral-400 hover:text-white hover:bg-neutral-800">
                Log in
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-white text-black hover:bg-neutral-200">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Full Width */}
        <section className="relative w-full py-20 md:py-32">
          <div className="w-full px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.h1
                className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                The Household Management Platform
              </motion.h1>
              <motion.p
                className="mt-6 text-lg text-neutral-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Organize, assign, and track household chores and expenses for everyone in your home. 
                No more arguments about who did what!
              </motion.p>
              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/signup">
                  <Button className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-base">Get Started</Button>
                </Link>
                <Link href="#how-it-works">
                  <Button
                    variant="outline"
                    className="border-neutral-700 text-white hover:bg-neutral-800 px-8 py-6 text-base"
                  >
                    Learn More
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                className="mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <CommandLine command="npx create-home-task@latest" className="mx-auto max-w-md" />
              </motion.div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What's in HomeTask?</h2>
              <p className="mt-4 text-neutral-400">Everything you need to manage household chores efficiently.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                title="Family Management"
                description="Create profiles for each family member with customizable avatars and track individual contributions."
              >
                <FamilyManagementIllustration />
              </FeatureCard>
              <FeatureCard
                title="Chore Scheduling"
                description="Assign, schedule, and track chores with due dates and priorities for better organization."
              >
                <ChoreSchedulingIllustration />
              </FeatureCard>
              <FeatureCard
                title="Points & Rewards"
                description="Earn points for completed chores and track progress on the leaderboard to encourage participation."
              >
                <PointsRewardsIllustration />
              </FeatureCard>
              <FeatureCard
                title="Task Verification"
                description="Verify completed chores and maintain accountability among household members."
              >
                <TaskVerificationIllustration />
              </FeatureCard>
              <FeatureCard
                title="Area Management"
                description="Organize chores by areas of your home for better organization and task distribution."
              >
                <AreaManagementIllustration />
              </FeatureCard>
              <FeatureCard
                title="Analytics Dashboard"
                description="Track completion trends, view statistics, and identify patterns to improve household efficiency."
              >
                <AnalyticsDashboardIllustration />
              </FeatureCard>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="relative w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">How It Works</h2>
              <p className="mt-4 text-neutral-400">Get started with HomeTask in just a few simple steps.</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <AnimatedCard
                icon={<Users className="h-5 w-5 text-white" />}
                title="1. Sign Up"
                description="Create an account with email or Google and set up your profile with a custom avatar."
              >
                <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
                  <code className="text-xs text-neutral-400">
                    <span className="text-green-400">✓</span> Quick registration process
                  </code>
                </div>
              </AnimatedCard>
              <AnimatedCard
                icon={<Home className="h-5 w-5 text-white" />}
                title="2. Create or Join a House"
                description="Create a new house or join an existing one with an ID and password."
              >
                <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
                  <code className="text-xs text-neutral-400">
                    <span className="text-green-400">✓</span> Secure house management
                  </code>
                </div>
              </AnimatedCard>
              <AnimatedCard
                icon={<Calendar className="h-5 w-5 text-white" />}
                title="3. Start Managing Chores"
                description="Add chores, assign tasks, and track completion for everyone in your house."
              >
                <div className="mt-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-3">
                  <code className="text-xs text-neutral-400">
                    <span className="text-green-400">✓</span> Intuitive task management
                  </code>
                </div>
              </AnimatedCard>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="relative w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">What Users Say</h2>
              <p className="mt-4 text-neutral-400">
                Hear from families who have transformed their household management.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatedCard
                title="Game Changer"
                description="HomeTask has completely eliminated the 'I didn't know I was supposed to do that' excuse in our household."
                className="border-green-900/30 bg-green-900/10"
              >
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-neutral-800"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Sarah Johnson</p>
                    <p className="text-xs text-neutral-400">Family of 4</p>
                  </div>
                </div>
              </AnimatedCard>
              <AnimatedCard
                title="Kids Love It"
                description="The points system has turned chores into a fun competition. My kids actually ask for more tasks now!"
                className="border-blue-900/30 bg-blue-900/10"
              >
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-neutral-800"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Michael Rodriguez</p>
                    <p className="text-xs text-neutral-400">Family of 5</p>
                  </div>
                </div>
              </AnimatedCard>
              <AnimatedCard
                title="Roommate Harmony"
                description="We used to argue constantly about chores. HomeTask has brought peace to our apartment."
                className="border-purple-900/30 bg-purple-900/10"
              >
                <div className="mt-4 flex items-center">
                  <div className="h-10 w-10 rounded-full bg-neutral-800"></div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">Alex Chen</p>
                    <p className="text-xs text-neutral-400">Shared Apartment</p>
                  </div>
                </div>
              </AnimatedCard>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent"></div>
        </section>

        {/* CTA Section */}
        <section className="relative w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <motion.h2
                className="text-3xl font-bold tracking-tight md:text-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                className="mt-4 text-neutral-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Join thousands of households already using HomeTask to manage their chores.
              </motion.p>
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link href="/signup">
                  <Button className="bg-white text-black hover:bg-neutral-200 px-8 py-6 text-base">
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-neutral-800 py-8 md:py-12">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-white" />
            <p className="text-sm font-medium text-white">HomeTask &copy; {new Date().getFullYear()}</p>
          </div>
          <div className="flex gap-6 text-sm text-neutral-400">
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
