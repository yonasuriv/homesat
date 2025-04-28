# Google OAuth Setup for Supabase

To properly configure Google OAuth for your Supabase project, follow these steps:

## 1. Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Identity Platform API

## 2. Configure OAuth Consent Screen

1. Go to "APIs & Services" > "OAuth consent screen"
2. Select "External" user type
3. Fill in the required information:
   - App name
   - User support email
   - Developer contact information
4. Add the following scopes:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
5. Add your domain to the authorized domains list

## 3. Create OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Add the following authorized JavaScript origins:
   - `http://localhost:3000` (for local development)
   - `https://your-production-domain.com` (for production)
5. Add the following authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (for local development)
   - `https://your-production-domain.com/auth/callback` (for production)
   - `https://<PROJECT_ID>.supabase.co/auth/v1/callback` (Supabase callback URL)

## 4. Configure Supabase

1. Go to your Supabase project dashboard
2. Navigate to "Authentication" > "Providers"
3. Find "Google" and click "Enable"
4. Enter your Google Client ID and Client Secret from the Google Cloud Console
5. Save the changes

## 5. Update Your Application Code

Make sure your application code uses the correct redirect URL:

\`\`\`javascript
const { error } = await supabaseClient.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo: `${window.location.origin}/auth/callback`,
    queryParams: {
      access_type: 'offline',
      prompt: 'consent',
    }
  },
})
\`\`\`

## Troubleshooting

If you're still having issues with the callback:

1. Check that your authorized domains in Google Cloud Console include your Supabase project domain (`<PROJECT_ID>.supabase.co`)
2. Verify that the redirect URIs include the Supabase callback URL (`https://<PROJECT_ID>.supabase.co/auth/v1/callback`)
3. Make sure your application is using the correct redirect URL
4. Check the browser console for any errors during the authentication process
