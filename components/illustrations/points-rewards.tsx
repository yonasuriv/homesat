export function PointsRewardsIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Trophy/Award */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-20 w-20 rounded-full bg-yellow-500/10 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full bg-yellow-500/30 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-yellow-500/40"></div>
            </div>
          </div>
        </div>

        {/* Star points */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 h-4 w-4 bg-yellow-500/40 rotate-45"></div>
        <div className="absolute top-1/2 -right-4 -translate-y-1/2 h-4 w-4 bg-yellow-500/40 rotate-45"></div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 h-4 w-4 bg-yellow-500/40 rotate-45"></div>
        <div className="absolute top-1/2 -left-4 -translate-y-1/2 h-4 w-4 bg-yellow-500/40 rotate-45"></div>
      </div>

      {/* Point counters */}
      <div className="absolute top-1/4 left-1/4 h-8 w-16 rounded bg-blue-500/20 flex items-center justify-center">
        <div className="text-xs text-blue-400">+25</div>
      </div>
      <div className="absolute top-1/4 right-1/4 h-8 w-16 rounded bg-green-500/20 flex items-center justify-center">
        <div className="text-xs text-green-400">+50</div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 h-8 w-16 rounded bg-purple-500/20 flex items-center justify-center">
        <div className="text-xs text-purple-400">+10</div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 h-8 w-16 rounded bg-pink-500/20 flex items-center justify-center">
        <div className="text-xs text-pink-400">+30</div>
      </div>

      {/* Blue accent lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M200,40 L200,80" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M200,120 L200,160" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M120,100 L160,100" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M240,100 L280,100" stroke="#0ea5e9" strokeWidth="2" />
      </svg>

      {/* Glowing dots */}
      <div className="absolute left-1/5 top-1/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-4/5 top-1/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-1/5 top-4/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-4/5 top-4/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
