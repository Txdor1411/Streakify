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
    signInWithGoogleTokens,
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
  signInWithGoogleToken: (
    idToken: string | null,
    accessToken: string | null
  ) => Promise<void>;
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
    const credential = await signInWithEmail(email, password);
    setUser(credential.user);
  }, []);

  const signUpUser = useCallback(async (email: string, password: string) => {
    const credential = await signUpWithEmail(email, password);
    setUser(credential.user);
  }, []);

  const signInWithGoogleToken = useCallback(
    async (idToken: string | null, accessToken: string | null) => {
      const nextUser = await signInWithGoogleTokens(idToken, accessToken);
      setUser(nextUser);
    },
    []
  );

  const signOutUser = useCallback(async () => {
    await signOutCurrentUser();
    setUser(null);
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