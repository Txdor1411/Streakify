import { onAuthStateChanged, User } from "firebase/auth";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    signInWithEmail,
    signInWithGoogleIdToken,
    signOutCurrentUser,
    signUpWithEmail,
} from "@/lib/auth";
import { auth } from "@/lib/firebase";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  isInitializing: boolean;
  signInUser: (email: string, password: string) => Promise<void>;
  signUpUser: (email: string, password: string) => Promise<void>;
  signInWithGoogleToken: (idToken: string) => Promise<void>;
  signOutUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setIsInitializing(false);
    });

    return unsubscribe;
  }, []);

  const signInUser = useCallback(async (email: string, password: string) => {
    await signInWithEmail(email, password);
  }, []);

  const signUpUser = useCallback(async (email: string, password: string) => {
    await signUpWithEmail(email, password);
  }, []);

  const signInWithGoogleToken = useCallback(async (idToken: string) => {
    await signInWithGoogleIdToken(idToken);
  }, []);

  const signOutUser = useCallback(async () => {
    await signOutCurrentUser();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      signInUser,
      signOutUser,
      signInWithGoogleToken,
      signUpUser,
    }),
    [isInitializing, signInUser, signInWithGoogleToken, signOutUser, signUpUser, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}