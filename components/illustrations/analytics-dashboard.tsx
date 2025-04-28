export function AnalyticsDashboardIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Dashboard elements */}
      <div className="absolute inset-6 flex flex-col gap-3">
        {/* Header */}
        <div className="h-6 w-full rounded bg-neutral-800"></div>

        {/* Charts */}
        <div className="flex gap-3 h-24">
          <div className="flex-1 rounded bg-neutral-800 p-2">
            <div className="h-full w-full flex items-end justify-around">
              <div className="w-1/6 h-1/4 bg-blue-500/40 rounded-t"></div>
              <div className="w-1/6 h-2/3 bg-blue-500/40 rounded-t"></div>
              <div className="w-1/6 h-1/2 bg-blue-500/40 rounded-t"></div>
              <div className="w-1/6 h-full bg-blue-500/40 rounded-t"></div>
              <div className="w-1/6 h-3/4 bg-blue-500/40 rounded-t"></div>
            </div>
          </div>
          <div className="flex-1 rounded bg-neutral-800 p-2">
            <div className="h-full w-full flex items-center justify-center">
              <div className="h-full w-full rounded-full border-4 border-blue-500/20 border-t-blue-500/60"></div>
            </div>
          </div>
        </div>

        {/* Data tables */}
        <div className="flex-1 rounded bg-neutral-800 p-2">
          <div className="flex flex-col gap-2">
            <div className="h-2 w-full rounded bg-neutral-700"></div>
            <div className="h-2 w-full rounded bg-neutral-700"></div>
            <div className="h-2 w-full rounded bg-neutral-700"></div>
            <div className="h-2 w-full rounded bg-neutral-700"></div>
          </div>
        </div>
      </div>

      {/* Blue accent lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,100 L380,100" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M200,20 L200,180" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
      </svg>

      {/* Glowing dots */}
      <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-1/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
