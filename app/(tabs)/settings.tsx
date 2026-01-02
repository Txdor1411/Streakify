import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, Text, View } from "react-native";
import { useTheme } from "../ThemeProvider";
const KEY_LARGE_TEXT = "@pref_large_text";
const KEY_REDUCE_MOTION = "@pref_reduce_motion";

export default function Settings() {
  const { dark: darkMode, toggle: toggleDark } = useTheme();
  const bg = darkMode ? "#05060a" : "#f7f7f8";
  const textColor = darkMode ? "#e0e1dd" : "#0d1b2a";
  const [largeText, setLargeText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const l = await AsyncStorage.getItem(KEY_LARGE_TEXT);
        const r = await AsyncStorage.getItem(KEY_REDUCE_MOTION);
        if (l !== null) setLargeText(l === "true");
        if (r !== null) setReduceMotion(r === "true");
      } catch (e) {
        console.warn("Failed to load settings", e);
      }
    })();
  }, []);
  const toggleLargeText = async (v: boolean) => {
    setLargeText(v);
    try { await AsyncStorage.setItem(KEY_LARGE_TEXT, v ? "true" : "false"); } catch {}
  };
  const toggleReduceMotion = async (v: boolean) => {
    setReduceMotion(v);
    try { await AsyncStorage.setItem(KEY_REDUCE_MOTION, v ? "true" : "false"); } catch {}
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bg }]}>
      <Text style={[styles.title, { color: textColor }]}>Settings</Text>

      <Text style={[styles.section, { color: textColor }]}>Appearance</Text>
        <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleDark} />
      </View>

      <Text style={[styles.section, { color: textColor }]}>Accessibility</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Large Text</Text>
        <Switch value={largeText} onValueChange={toggleLargeText} />
      </View>
      <View style={styles.row}>
        <Text style={[styles.label, { color: textColor }]}>Reduce Motion</Text>
        <Switch value={reduceMotion} onValueChange={toggleReduceMotion} />
      </View>
    </ScrollView>
  );
}  
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f7f8",
    minHeight: "100%",
  },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 12, color: "#0d1b2a" },
  section: { fontSize: 16, fontWeight: "700", marginTop: 18, color: "#0d1b2a" },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 12 },
  label: { fontSize: 16, fontWeight: "600", color: "#0d1b2a" },
  body: { marginTop: 8, color: "#0d1b2a", lineHeight: 20 },
});