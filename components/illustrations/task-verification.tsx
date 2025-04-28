export function TaskVerificationIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Checklist */}
      <div className="absolute inset-10 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded border border-green-500 bg-green-500/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12L10 17L20 7"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="h-3 w-24 rounded bg-neutral-700"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded border border-green-500 bg-green-500/20 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12L10 17L20 7"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="h-3 w-32 rounded bg-neutral-700"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded border border-blue-500 bg-blue-500/20"></div>
          <div className="h-3 w-28 rounded bg-neutral-700"></div>
        </div>

        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded border border-blue-500 bg-blue-500/20"></div>
          <div className="h-3 w-20 rounded bg-neutral-700"></div>
        </div>
      </div>

      {/* Blue accent lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,20 L380,20" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
        <path d="M20,180 L380,180" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" />
      </svg>

      {/* Glowing dots */}
      <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-1/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
