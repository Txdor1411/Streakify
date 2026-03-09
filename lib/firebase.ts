import AsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
    Auth,
    getAuth,
    initializeAuth,
} from "firebase/auth";
import { Platform } from "react-native";

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
  try {
    // `firebase/auth/react-native` is not always exposed via typings.
    // Runtime import enables native persistence when the module exists.
    const reactNativeAuth = require("firebase/auth/react-native");
    auth = initializeAuth(app, {
      persistence: reactNativeAuth.getReactNativePersistence(AsyncStorage),
    });
  } catch {
    try {
      auth = initializeAuth(app);
    } catch {
      auth = getAuth(app);
    }
  }
}

export { app, auth };

