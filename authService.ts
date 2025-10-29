import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    UserCredential
} from "firebase/auth";
import { auth } from "./lib/firebaseConfig";
    
    export async function signUp(email: string, password: string): Promise<UserCredential> {
      return createUserWithEmailAndPassword(auth, email, password);
    }
    
    export async function logIn(email: string, password: string): Promise<UserCredential> {
      return signInWithEmailAndPassword(auth, email, password);
    }
    
    export async function logOut(): Promise<void> {
      return signOut(auth);
    }
  