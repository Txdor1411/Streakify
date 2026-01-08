import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useTheme } from "../ThemeProvider";

export default function Index() {
  const { dark } = useTheme();
  const bg = dark ? "#05060a" : "#e0e1dd";
  const textColor = dark ? "#e0e1dd" : "#0d1b2a";

  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [todoExpanded, setTodoExpanded] = useState(false);
  const [doneExpanded, setDoneExpanded] = useState(false);
  const VISIBLE_COUNT = 3;
  const stories = [
    { id: "s1", name: "You", unseen: true },
    { id: "s2", name: "Anna", unseen: true },
    { id: "s3", name: "Mark", unseen: false },
    { id: "s4", name: "Lena", unseen: true },
    { id: "s5", name: "Kai Cenat", unseen: false },
  ];
  const [habits, setHabits] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const [expandedHabitId, setExpandedHabitId] = useState<string | null>(null);

  const loadHabits = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem("@habits");
      const list = raw ? JSON.parse(raw) : [];
      setHabits(list);
    } catch (e) {
      console.error("Failed loading habits", e);
    }
  }, []);

  useEffect(() => {
    if (isFocused) loadHabits();
  }, [isFocused, loadHabits]);

  const markDone = (id: string) => {
    setCompletedHabits(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  const undoDone = (id: string) => {
    setCompletedHabits(prev => prev.filter(habitId => habitId !== id));
  };

  const deleteHabit = (id: string) => {
    Alert.alert("Delete habit", "Are you sure you want to delete this habit?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const raw = await AsyncStorage.getItem("@habits");
            const list = raw ? JSON.parse(raw) : [];
            const updated = list.filter((x: any) => x.id !== id);
            await AsyncStorage.setItem("@habits", JSON.stringify(updated));
            setHabits(updated);
            setCompletedHabits(prev => prev.filter(hid => hid !== id));
            if (expandedHabitId === id) setExpandedHabitId(null);
          } catch (e) {
            console.error("Failed deleting habit", e);
            Alert.alert("Error", "Failed to delete habit.");
          }
        }
      }
    ]);
  };

  const todo = habits.filter(h => !completedHabits.includes(h.id));
  const done = habits.filter(h => completedHabits.includes(h.id));

  return (
    <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: bg }]}>
      <View style={[styles.container, { backgroundColor: bg }]}>

        {}
        <View style={styles.storiesWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesScroll}
          >
            {stories.map((s) => (
              <View key={s.id} style={styles.storyItem}>
                {s.unseen ? (
                  dark ? (
                    <LinearGradient
                      colors={["#FFD700", "#FF00FF"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.storyOutlineGradient}
                    >
                      <View style={[styles.storyCircleInner, { backgroundColor: bg }]} />
                    </LinearGradient>
                  ) : (
                    <View style={[styles.storyCircle, styles.storyOutlineLight]} />
                  )
                ) : (
                  <View style={styles.storyCircle} />
                )}
                <Text style={[styles.storyLabel, { color: textColor }]}>{s.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <Text style={[styles.header, { color: textColor }]}>To do</Text>
        <View style={styles.habitsList}>
          { (todoExpanded ? todo : todo.slice(0, VISIBLE_COUNT)).map((h) => (
            <Pressable
              key={h.id}
              style={({ pressed }) => [
                styles.habitCard,
                expandedHabitId === h.id && styles.habitCardExpanded,
                { backgroundColor: h.color ?? "#415A77" },
                pressed && { opacity: 0.85 }
              ]}
              android_ripple={{ color: "#335165" }}
              onPress={() => markDone(h.id)}
              onLongPress={() => setExpandedHabitId(prev => prev === h.id ? null : h.id)}
            >
              {({ pressed }) => (
                <>
                  <View style={[
                    styles.checkContainer,
                    pressed && { borderColor: "transparent" }
                  ]}>
                    <Text style={{ fontSize: 18 }}>{h.icon ?? ""}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.habitTitle}>{h.title ?? h.name ?? "Habit"}</Text>
                    {expandedHabitId === h.id && (
                      <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={styles.habitDescription}>{h.description ?? "No description"}</Text>
                        <Pressable onPress={() => deleteHabit(h.id)} style={styles.deleteButton}>
                          <Text style={styles.deleteText}>Delete</Text>
                        </Pressable>
                      </View>
                    )}
                  </View>
                </>
              )}
            </Pressable>
          ))}
          {todo.length > VISIBLE_COUNT && (
            <Pressable style={styles.seeMoreButton} onPress={() => setTodoExpanded(prev => !prev)}>
              <Text style={styles.seeMoreText}>{todoExpanded ? "Show less" : `See more (${todo.length - VISIBLE_COUNT})`}</Text>
            </Pressable>
          )}
        </View>

        <Text style={[styles.header, { marginTop: 24, color: textColor }]}>Done</Text>
        <View style={styles.habitsList}>
          { (doneExpanded ? done : done.slice(0, VISIBLE_COUNT)).map((h) => (
            <Pressable
              key={h.id}
              style={() => [
                styles.habitCard,
                styles.completedHabitCard,
                expandedHabitId === h.id && styles.habitCardExpanded,
                { backgroundColor: h.color ?? "#415A77" }
              ]}
              onPress={() => undoDone(h.id)}          
              onLongPress={() => setExpandedHabitId(prev => prev === h.id ? null : h.id)}     
            >
              <View style={[styles.checkContainer, styles.checkedContainer]}>
                <Text style={{ fontSize: 18 }}>{h.icon ?? ""}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.completedHabitTitle}>{h.title ?? h.name ?? "Habit"}</Text>
                {expandedHabitId === h.id && (
                  <View style={{ marginTop: 8, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={styles.habitDescription}>{h.description ?? "No description"}</Text>
                    <Pressable onPress={() => deleteHabit(h.id)} style={styles.deleteButton}>
                      <Text style={styles.deleteText}>Delete</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </Pressable>
          ))}
          {done.length > VISIBLE_COUNT && (
            <Pressable style={styles.seeMoreButton} onPress={() => setDoneExpanded(prev => !prev)}>
              <Text style={styles.seeMoreText}>{doneExpanded ? "Show less" : `See more (${done.length - VISIBLE_COUNT})`}</Text>
            </Pressable>
          )}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#e0e1dd",
    marginTop: 18,
  },
  header: {
    color: "#0d1b2a",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
  },
  storiesWrapper: {
    marginTop: 16,
    marginBottom: 8,
  },
  storiesScroll: {
    paddingHorizontal: 4,
    alignItems: "center",
  },
  storyItem: {
    width: 72,
    alignItems: "center",
    marginRight: 12,
  },
  storyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: "transparent",
  },
  storyOutlineLight: {
    borderWidth: 3,
    borderColor: "#6BCB77",
  },
  storyOutlineGradient: {
    width: 74,
    height: 74,
    borderRadius: 37,
    alignItems: "center",
    justifyContent: "center",
  },
  storyCircleInner: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },
  storyLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#0d1b2a",
  },
  habitsList: {
    marginTop: 15,
    marginBottom: 5,
  },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#415A77",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 18,
    marginBottom: 17,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  checkCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#0d1b2a",
    marginRight: 12,
  },
  checkedCircle: {
    backgroundColor: "#415A77",
    borderColor: "#415A77",
  },
  habitTitle: {
    fontSize: 16,
    color: "#0d1b2a",
  },
  completedHabitCard: {
    backgroundColor: "#415A77",
    opacity: 0.8,
    shadowOpacity: 0.02,
  },
  completedHabitTitle: {
    textDecorationLine: "line-through",
    color: "#0d1b2a",
  },
  habittitle: {
    fontSize: 18,
    color: "#0d1b2a",
  }, 
  checkContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#0d1b2a",
    marginRight: 12,
  },
  
  checkedContainer: {
    backgroundColor: "#415A77",
    borderColor: "#415A77",
  },
  habitCardExpanded: {
    paddingVertical: 22,
    alignItems: "flex-start",
  },
  habitDescription: {
    marginTop: 8,
    color: "#0d1b2a",
    fontSize: 14,
    opacity: 0.95,
  },
  deleteButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "#ff6b6b",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
  seeMoreButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
    backgroundColor: "transparent",
  },
  seeMoreText: {
    color: "#0d3b4a",
    fontSize: 14,
    fontWeight: "600",
  },
  scrollContent: {
    backgroundColor: "#e0e1dd",
    justifyContent: "center",
    flexGrow: 1,         // ensure content fills ScrollView so paddingBottom is respected
    paddingBottom: 92,  // space for bottom nav — increased to avoid overlap with navbar
  }
});