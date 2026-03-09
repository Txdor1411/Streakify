# Streakify

Streakify is an Expo Router app with Firebase Authentication.

## Auth Features

- Email/password signup
- Email/password login
- Google login (via Expo AuthSession + Firebase credential sign-in)
- Session persistence and restore on app launch
- Route guards:
  - Signed-out users are redirected to `/(auth)/login`
  - Signed-in users are redirected to `/(tabs)`
- Logout from the authenticated home screen

## Setup

1. Install dependencies.

```bash
npm install
```

2. Create a `.env` file in the project root using `.env.example` as a template, then fill in your keys.

3. Start the app.

```bash
npx expo start
```

## Required Environment Variables

Firebase:
- `EXPO_PUBLIC_FIREBASE_API_KEY`
- `EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `EXPO_PUBLIC_FIREBASE_PROJECT_ID`
- `EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `EXPO_PUBLIC_FIREBASE_APP_ID`

Google Auth:
- `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID`
- `EXPO_PUBLIC_GOOGLE_REDIRECT_URI` (optional override)

## Firebase Console Checklist

1. Enable `Email/Password` in Firebase Auth providers.
2. Enable `Google` provider in Firebase Auth.
3. Add app platforms in Firebase project settings and use their matching OAuth client IDs.
4. If testing on web, add your web origin to authorized domains.

## Google OAuth Redirect URI Fix

If Google shows `redirect_uri=http://localhost:8081` is not authorized:

1. Open Google Cloud Console -> APIs & Services -> Credentials.
2. Open the OAuth Client used by `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID`.
3. In `Authorized redirect URIs`, add:
  - `http://localhost:8081`
4. In `Authorized JavaScript origins`, add:
  - `http://localhost:8081`
5. Save, wait 1-2 minutes, then restart Expo dev server.

For non-local environments, set `EXPO_PUBLIC_GOOGLE_REDIRECT_URI` in `.env.local` to the exact URI you registered in Google Cloud.

## Project Structure (Auth)

- `app/(auth)/login.tsx` - login screen and Google sign-in trigger
- `app/(auth)/signup.tsx` - signup screen
- `lib/firebase.ts` - Firebase app/auth initialization
- `lib/auth.ts` - auth methods + error mapping
- `lib/auth-context.tsx` - auth session state and provider
- `app/_layout.tsx` - auth gate and route redirect logic
