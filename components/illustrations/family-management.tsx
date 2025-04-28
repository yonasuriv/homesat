export function FamilyManagementIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* Blue accent lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50,100 C50,50 150,50 200,100 C250,150 350,150 350,100"
          stroke="#0ea5e9"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        <path d="M50,150 C100,100 150,100 200,150" stroke="#0ea5e9" strokeWidth="2" />
      </svg>

      {/* User icons */}
      <div className="absolute left-1/4 top-1/4 h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-blue-500/40"></div>
      </div>
      <div className="absolute left-1/2 top-1/3 h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-purple-500/40"></div>
      </div>
      <div className="absolute left-2/3 top-1/2 h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-green-500/40"></div>
      </div>
      <div className="absolute left-1/3 top-2/3 h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full bg-yellow-500/40"></div>
      </div>

      {/* Glowing dots */}
      <div className="absolute left-1/5 top-1/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/5 top-2/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-4/5 top-3/5 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
