import Link from "next/link"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
        Dashboard
      </Link>
      <Link href="/chores" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Chores
      </Link>
      <Link href="/schedule" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Schedule
      </Link>
      <Link href="/settings" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
        Settings
      </Link>
    </nav>
  )
}
