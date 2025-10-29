// hooks/useAuth.ts
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../lib/firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // user logat sau null
    });
    return unsubscribe;
  }, []);

  return { user }; // obiect cu cheia user
}