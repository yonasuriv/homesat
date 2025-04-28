"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2, Shield, ShieldCheck, Trash2, UserCog } from "lucide-react"
import { supabaseClient } from "@/lib/supabase/client"
import { useToast } from "@/components/ui/use-toast"

type User = {
  id: string
  email: string
  name: string
  role: string
  is_admin: boolean
  created_at: string
  last_sign_in_at: string | null
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [userToDelete, setUserToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      setLoading(true)

      // Get all users with their admin status
      const { data, error } = await supabaseClient.from("house_members").select(`
          id,
          user_id,
          name,
          role,
          is_admin,
          created_at,
          users:user_id (
            email,
            last_sign_in_at
          )
        `)

      if (error) throw error

      // Format the data
      const formattedUsers = data.map((user) => ({
        id: user.user_id,
        email: user.users?.email || "No email",
        name: user.name,
        role: user.role,
        is_admin: user.is_admin || false,
        created_at: new Date(user.created_at).toLocaleDateString(),
        last_sign_in_at: user.users?.last_sign_in_at
          ? new Date(user.users.last_sign_in_at).toLocaleDateString()
          : "Never",
      }))

      setUsers(formattedUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
      toast({
        title: "Error fetching users",
        description: "There was a problem loading the user data.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  async function toggleAdminStatus(userId: string, currentStatus: boolean) {
    try {
      const { error } = await supabaseClient
        .from("house_members")
        .update({ is_admin: !currentStatus })
        .eq("user_id", userId)

      if (error) throw error

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, is_admin: !currentStatus } : user)))

      toast({
        title: "User updated",
        description: `User is now ${!currentStatus ? "an admin" : "a regular user"}.`,
      })
    } catch (error) {
      console.error("Error updating user:", error)
      toast({
        title: "Error updating user",
        description: "There was a problem updating the user's admin status.",
        variant: "destructive",
      })
    }
  }

  async function deleteUser() {
    if (!userToDelete) return

    try {
      // Delete user from house_members
      const { error: memberError } = await supabaseClient.from("house_members").delete().eq("user_id", userToDelete)

      if (memberError) throw memberError

      // Update local state
      setUsers(users.filter((user) => user.id !== userToDelete))

      toast({
        title: "User deleted",
        description: "The user has been removed from the system.",
      })
    } catch (error) {
      console.error("Error deleting user:", error)
      toast({
        title: "Error deleting user",
        description: "There was a problem deleting the user.",
        variant: "destructive",
      })
    } finally {
      setUserToDelete(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserCog className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription>Manage users and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{user.created_at}</TableCell>
                  <TableCell>{user.last_sign_in_at}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={user.is_admin}
                        onCheckedChange={() => toggleAdminStatus(user.id, user.is_admin)}
                      />
                      {user.is_admin ? (
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                      ) : (
                        <Shield className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={() => setUserToDelete(user.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will remove the user from the system. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setUserToDelete(null)}>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={deleteUser}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}
