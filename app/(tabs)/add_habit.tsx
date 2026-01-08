import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../ThemeProvider";

const ICONS = [
  { id: "🏃", name: "Run" },
  { id: "📚", name: "Read" },
  { id: "💧", name: "Hydrate" },
  { id: "🧘", name: "Meditate" },
];

const COLORS = ["#FF6B6B", "#F7B267", "#6BCB77", "#4D96FF", "#B197FC"];

export default function AddHabit() {
  const { dark } = useTheme();
  const bg = dark ? "#05060a" : "#f7f7f8";
  const textColor = dark ? "#e0e1dd" : "#0d1b2a";
  const inputBg = dark ? "#0b0b0c" : "#fff";
  const borderColor = dark ? "#1f2937" : "#e6e6e6";
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(ICONS[0].id);
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const [notify, setNotify] = useState(false);

  const saveHabit = async () => {
    if (!name.trim()) {
      Alert.alert("Name required", "Please enter a habit name.");
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      name: name.trim(),
      description: description.trim(),
      icon: selectedIcon,
      color,
      notify,
      createdAt: new Date().toISOString(),
    };

    try {
      const raw = await AsyncStorage.getItem("@habits");
      const list = raw ? JSON.parse(raw) : [];
      list.push(newHabit);
      await AsyncStorage.setItem("@habits", JSON.stringify(list));
      Alert.alert("Saved", "Habit saved successfully.");
      setName("");
      setDescription("");
      setSelectedIcon(ICONS[0].id);
      setColor(COLORS[0]);
      setNotify(false);
    } catch (e) {
      console.error(e);
      Alert.alert("Error", "Failed to save habit.");
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: bg }] }>
      <Text style={[styles.title, { color: textColor }]}>Add a Habit</Text>

      <Text style={[styles.label, { color: textColor }]}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="e.g., Morning Run"
        placeholderTextColor={dark ? "#9ca3af" : "#9aa0a6"}
        style={[styles.input, { backgroundColor: inputBg, borderColor, color: textColor }]}
      />

      <Text style={[styles.label, { color: textColor }]}>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Optional description"
        placeholderTextColor={dark ? "#9ca3af" : "#9aa0a6"}
        style={[styles.input, { height: 100, backgroundColor: inputBg, borderColor, color: textColor }]}
        multiline
      />

      <Text style={[styles.label, { color: textColor }]}>Icon</Text>
      <View style={styles.row}> 
        <Pressable
          onPress={() => setIconDropdownOpen((s) => !s)}
          style={[styles.iconPreview, { backgroundColor: color }]}
        >
          <Text style={styles.iconEmoji}>{selectedIcon}</Text>
        </Pressable>
        <View style={{ flex: 1 }}>
          {iconDropdownOpen && (
            <View style={[styles.dropdown, { backgroundColor: inputBg, borderColor }] }>
              {ICONS.map((ic) => (
                <TouchableOpacity
                  key={ic.id}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setSelectedIcon(ic.id);
                    setIconDropdownOpen(false);
                  }}
                >
                  <Text style={styles.iconEmoji}>{ic.id}</Text>
                  <Text style={{ marginLeft: 8, color: textColor }}>{ic.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      <Text style={[styles.label, { color: textColor }]}>Color</Text>
      <View style={styles.colorRow}>
        {COLORS.map((c) => (
          <Pressable
            key={c}
            onPress={() => setColor(c)}
            style={[styles.colorDot, { backgroundColor: c, borderWidth: color === c ? 3 : 0 }]}
          />
        ))}
      </View>

      <View style={[styles.row, { marginTop: 20, alignItems: "center" }]}> 
        <Text style={[styles.label, { color: textColor}]}>Notify</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <Pressable style={[styles.saveButton, { backgroundColor: color }]} onPress={saveHabit}>
        <Text style={styles.saveText}>Save Habit</Text>
      </Pressable>
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
  label: { fontSize: 16, fontWeight: "600", marginTop: 12, color: "#0d1b2a" },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  row: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  iconPreview: {
    width: 54,
    height: 54,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconEmoji: { fontSize: 22 },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e6e6e6",
  },
  dropdownItem: { flexDirection: "row", alignItems: "center", padding: 8 },
  colorRow: { flexDirection: "row", marginTop: 8, gap: 10 },
  colorDot: { width: 36, height: 36, borderRadius: 18, marginRight: 8 },
  saveButton: {
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});