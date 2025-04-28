export function ChoreSchedulingIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Calendar outline */}
      <div className="absolute inset-10 rounded-md border border-neutral-700 bg-neutral-900/50">
        {/* Calendar header */}
        <div className="border-b border-neutral-700 p-2">
          <div className="h-4 w-24 rounded bg-neutral-700"></div>
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1 p-2">
          {Array.from({ length: 31 }).map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded ${
                [3, 7, 12, 18, 24].includes(i) ? "bg-blue-500/20 border border-blue-500/40" : "bg-neutral-800"
              }`}
            >
              {[3, 7, 12, 18, 24].includes(i) && (
                <div className="h-1 w-3/4 mx-auto mt-2 rounded-full bg-blue-500/60"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Blue accent lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,20 L50,20 L50,50" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M380,20 L350,20 L350,50" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M20,180 L50,180 L50,150" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M380,180 L350,180 L350,150" stroke="#0ea5e9" strokeWidth="2" />
      </svg>

      {/* Glowing dots */}
      <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-1/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
