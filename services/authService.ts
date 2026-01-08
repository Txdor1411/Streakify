import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

export async function login(email: string, password: string) {
  const res = await signInWithEmailAndPassword(auth, email.trim(), password);
  return res.user;
}

export async function signup(email: string, password: string) {
  const res = await createUserWithEmailAndPassword(auth, email.trim(), password);
  return res.user;
}

export async function logout() {
  await signOut(auth);
}
