export function AreaManagementIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      {/* House layout */}
      <div className="absolute inset-10">
        {/* Kitchen */}
        <div className="absolute left-0 top-0 h-1/2 w-1/2 border border-blue-500/30 bg-blue-500/10 p-2">
          <div className="text-xs text-blue-400">Kitchen</div>
        </div>

        {/* Living Room */}
        <div className="absolute right-0 top-0 h-1/2 w-1/2 border border-purple-500/30 bg-purple-500/10 p-2">
          <div className="text-xs text-purple-400">Living Room</div>
        </div>

        {/* Bathroom */}
        <div className="absolute left-0 bottom-0 h-1/2 w-1/3 border border-green-500/30 bg-green-500/10 p-2">
          <div className="text-xs text-green-400">Bathroom</div>
        </div>

        {/* Bedroom */}
        <div className="absolute right-0 bottom-0 h-1/2 w-2/3 border border-yellow-500/30 bg-yellow-500/10 p-2">
          <div className="text-xs text-yellow-400">Bedroom</div>
        </div>
      </div>

      {/* Blue accent lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20,20 L20,180" stroke="#0ea5e9" strokeWidth="2" />
        <path d="M380,20 L380,180" stroke="#0ea5e9" strokeWidth="2" />
      </svg>

      {/* Glowing dots */}
      <div className="absolute left-1/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-1/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-1/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
      <div className="absolute left-3/4 top-3/4 h-1 w-1 rounded-full bg-blue-500 shadow-[0_0_10px_2px_rgba(59,130,246,0.5)]"></div>
    </div>
  )
}
