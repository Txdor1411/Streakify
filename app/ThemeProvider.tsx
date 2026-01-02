import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

const KEY_DARK = "@pref_dark";

type ThemeContextType = {
  dark: boolean;
  setDark: (v: boolean) => void;
  toggle: (v?: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDarkState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const v = await AsyncStorage.getItem(KEY_DARK);
        if (v !== null) setDarkState(v === "true");
      } catch (e) {
        console.warn("Failed to load theme preference", e);
      }
    })();
  }, []);

  const setDark = async (v: boolean) => {
    setDarkState(v);
    try {
      await AsyncStorage.setItem(KEY_DARK, v ? "true" : "false");
    } catch {}
    console.log("ThemeProvider: setDark ->", v);
  };

  const toggle = (v?: boolean) => {
    const next = typeof v === "boolean" ? v : !dark;

    console.log("ThemeProvider: toggle ->", next);
    setDark(next);
  };

  return (
    <ThemeContext.Provider value={{ dark, setDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export default ThemeProvider;
