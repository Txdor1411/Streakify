import { FirebaseError } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithCredential,
    signInWithEmailAndPassword,
    signOut,
    User,
    UserCredential,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

function getAuthMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Something went wrong. Please try again.";
  }

  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/missing-password":
      return "Please enter your password.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/email-already-in-use":
      return "This email is already in use.";
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/popup-closed-by-user":
    case "auth/cancelled-popup-request":
      return "Google sign-in was cancelled.";
    default:
      return "Authentication failed. Please try again.";
  }
}

export function mapAuthError(error: unknown): string {
  return getAuthMessage(error);
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email.trim(), password);
}

export async function signInWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email.trim(), password);
}

export async function signInWithGoogleIdToken(idToken: string): Promise<User> {
  const credential = GoogleAuthProvider.credential(idToken);
  const result = await signInWithCredential(auth, credential);
  return result.user;
}

export async function signInWithGoogleTokens(
  idToken: string | null,
  accessToken: string | null
): Promise<User> {
  const credential = GoogleAuthProvider.credential(idToken, accessToken);

  if (!credential) {
    throw new Error("Google did not return usable tokens.");
  }

  const result = await signInWithCredential(auth, credential);
  return result.user;
}

export async function signOutCurrentUser(): Promise<void> {
  await signOut(auth);
}