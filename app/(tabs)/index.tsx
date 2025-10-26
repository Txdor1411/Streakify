import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const habits = [
    { id: "1", title: "Drink water" },
    { id: "2", title: "Exercise" },
    { id: "3", title: "Read a book"},
    { id: "4", title: "Meditate" },
    { id: "5", title: "Sleep early" },
    { id: "6", title: "Practice a hobby" },
    { id: "7", title: "Learn something new" },
    { id: "8", title: "Eat healthy" },
    { id: "9", title: "Limit screen time" },
    { id: "10", title: "Connect with loved ones" },
    { id: "11", title: "Plan your day" },
    { id: "12", title: "Reflect on your goals" },
    { id: "13", title: "Practice gratitude" },
    { id: "14", title: "Take breaks" },
    { id: "15", title: "Stay organized" },
    { id: "16", title: "Avoid procrastination" },
    { id: "17", title: "Stay positive" },
    { id: "18", title: "Practice mindfulness" },
    { id: "19", title: "Limit caffeine intake" },
    { id: "20", title: "Get fresh air" },
    { id: "21", title: "Stretch" },
    { id: "22", title: "Practice deep breathing" },
    { id: "23", title: "Set daily intentions" },
    { id: "24", title: "Journal your thoughts" },
    { id: "25", title: "Avoid negative self-talk" },
    { id: "26", title: "Practice self-care" },
    // lista obiceiurilor 
  ];

  const toggleHabit = (id: string) => {
    setCompletedHabits(prev => 
      prev.includes(id) 
        ? prev.filter(habitId => habitId !== id)
        : [...prev, id]
    );
  };

  return (
  <ScrollView contentContainerStyle={styles.scrollContent}>
    <View style={styles.container}>
      <Text style={styles.header}>To do</Text>

      <View style={styles.habitsList}>
        {habits.map((h) => (
          <Pressable 
  key={h.id} 
  style={({pressed}) => [
    styles.habitCard,
    completedHabits.includes(h.id) && styles.completedHabitCard,
    pressed && !completedHabits.includes(h.id) && { backgroundColor: "#415A77" }
  ]} 
  android_ripple={{ color: "#415A77" }}
  onPress={() => toggleHabit(h.id)}
>
  {({ pressed }) => (
    <>
      <View style={[
        styles.checkContainer,
        completedHabits.includes(h.id) && styles.checkedContainer,
        pressed && !completedHabits.includes(h.id) && { backgroundColor: "#415A77", borderColor: "#415A77" }
      ]} />
      <Text style={[
        styles.habitTitle,
        completedHabits.includes(h.id) && styles.completedHabitTitle
      ]}>
        {h.title}
      </Text>
    </>
  )}
</Pressable>
        ))}
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
  },
  header: {
    color: "#0d1b2a",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 12,
  },
  habitsList: {
    marginTop: 16,
  },
  habitCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#415A77",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 12,
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
  scrollContent: {
    backgroundColor: "#e0e1dd",
    justifyContent: "center",
  }
});