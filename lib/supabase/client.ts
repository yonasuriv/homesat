import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Get the site URL for redirect
const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    'http://localhost:3000'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to NOT include trailing `/`
  url = url.charAt(url.length - 1) === '/' ? url.slice(0, -1) : url
  return url
}

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    autoRefreshToken: true,
    detectSessionInUrl: true,
    persistSession: true,
  },
})
