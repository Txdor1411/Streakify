import AsyncStorage from "@react-native-async-storage/async-storage";
import { FirebaseError, getApp, getApps, initializeApp } from "firebase/app";
import {
    Auth,
    getAuth,
    initializeAuth,
} from "firebase/auth";
import { Platform } from "react-native";

type ReactNativeAuthModule = {
  getReactNativePersistence?: (storage: typeof AsyncStorage) => unknown;
  default?: {
    getReactNativePersistence?: (storage: typeof AsyncStorage) => unknown;
  };
};

function resolveGetReactNativePersistence():
  | ((storage: typeof AsyncStorage) => unknown)
  | null {
  let reactNativeAuth: ReactNativeAuthModule | null = null;

  try {
    reactNativeAuth = require("firebase/auth/react-native") as ReactNativeAuthModule;
  } catch {
    reactNativeAuth = null;
  }

  const fromReactNativeEntry = reactNativeAuth
    ? reactNativeAuth.getReactNativePersistence ??
      reactNativeAuth.default?.getReactNativePersistence
    : undefined;

  if (fromReactNativeEntry) {
    return fromReactNativeEntry;
  }

  const authModule = require("firebase/auth") as ReactNativeAuthModule;
  const fromMainEntry =
    authModule.getReactNativePersistence ??
    authModule.default?.getReactNativePersistence;

  if (fromMainEntry) {
    return fromMainEntry;
  }

  return null;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

const firebaseConfig = {
  apiKey: getRequiredEnv("EXPO_PUBLIC_FIREBASE_API_KEY"),
  authDomain: getRequiredEnv("EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  projectId: getRequiredEnv("EXPO_PUBLIC_FIREBASE_PROJECT_ID"),
  storageBucket: getRequiredEnv("EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET"),
  messagingSenderId: getRequiredEnv("EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"),
  appId: getRequiredEnv("EXPO_PUBLIC_FIREBASE_APP_ID"),
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let auth: Auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  const getReactNativePersistence = resolveGetReactNativePersistence();

  if (getReactNativePersistence) {
    try {
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } catch (error) {
      if (error instanceof FirebaseError && error.code === "auth/already-initialized") {
        auth = getAuth(app);
      } else {
        throw error;
      }
    }
  } else {
    auth = getAuth(app);
  }
}

export { app, auth };

