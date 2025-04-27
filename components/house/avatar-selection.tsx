"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarSelectionProps {
  selectedAvatar: string | null
  setSelectedAvatar: (avatar: string) => void
  username: string
  setUsername: (username: string) => void
}

export function AvatarSelection({ selectedAvatar, setSelectedAvatar, username, setUsername }: AvatarSelectionProps) {
  const avatars = [
    { id: "male-1", src: "/thoughtful-bearded-professional.png", alt: "Male Avatar 1" },
    { id: "male-2", src: "/thoughtful-student.png", alt: "Male Avatar 2" },
    { id: "male-3", src: "/thoughtful-gentleman.png", alt: "Male Avatar 3" },
    { id: "female-1", src: "/confident-professional.png", alt: "Female Avatar 1" },
    { id: "female-2", src: "/thoughtful-student.png", alt: "Female Avatar 2" },
    { id: "female-3", src: "/confident-silver.png", alt: "Female Avatar 3" },
  ]

  function getInitials(name: string) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          placeholder="Your display name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Select an avatar</Label>
        <RadioGroup value={selectedAvatar || ""} onValueChange={setSelectedAvatar} className="grid grid-cols-3 gap-4">
          {avatars.map((avatar) => (
            <div key={avatar.id} className="flex flex-col items-center space-y-2">
              <RadioGroupItem value={avatar.id} id={avatar.id} className="sr-only" />
              <Label
                htmlFor={avatar.id}
                className={`cursor-pointer flex flex-col items-center space-y-2 ${
                  selectedAvatar === avatar.id ? "ring-2 ring-primary rounded-full" : ""
                }`}
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage src={avatar.src || "/placeholder.svg"} alt={avatar.alt} />
                  <AvatarFallback>{getInitials(username)}</AvatarFallback>
                </Avatar>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
