import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const [completedHabits, setCompletedHabits] = useState<string[]>([]);
  const [todoExpanded, setTodoExpanded] = useState(false);
  const [doneExpanded, setDoneExpanded] = useState(false);
  const VISIBLE_COUNT = 3; // adjust how many items are shown initially
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
    
    // lista obiceiurilor 
  ];

  const markDone = (id: string) => {
    setCompletedHabits(prev => prev.includes(id) ? prev : [...prev, id]);
  };

  // undo (onLongPress)
  const undoDone = (id: string) => {
    setCompletedHabits(prev => prev.filter(habitId => habitId !== id));
  };

  const todo = habits.filter(h => !completedHabits.includes(h.id));
  const done = habits.filter(h => completedHabits.includes(h.id));

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>

        <Text style={styles.header}>To do</Text>
        <View style={styles.habitsList}>
          { (todoExpanded ? todo : todo.slice(0, VISIBLE_COUNT)).map((h) => (
            <Pressable
              key={h.id}
              style={({ pressed }) => [
                styles.habitCard,
                pressed && { backgroundColor: "#335165" } // darker on press for todo items
              ]}
              android_ripple={{ color: "#335165" }}
              onPress={() => markDone(h.id)}
            >
              {({ pressed }) => (
                <>
                  <View style={[
                    styles.checkContainer,
                    pressed && { backgroundColor: "#335165", borderColor: "#335165" }
                  ]} />
                  <Text style={styles.habitTitle}>{h.title}</Text>
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

        <Text style={[styles.header, { marginTop: 24 }]}>Done</Text>
        <View style={styles.habitsList}>
          { (doneExpanded ? done : done.slice(0, VISIBLE_COUNT)).map((h) => (
            <Pressable
              key={h.id}
              style={() => [
                styles.habitCard,
                styles.completedHabitCard
              ]}
              onPress={() => undoDone(h.id)}          // tap to undo
              onLongPress={() => undoDone(h.id)}      // or long press to undo
            >
              <View style={[styles.checkContainer, styles.checkedContainer]} />
              <Text style={styles.completedHabitTitle}>{h.title}</Text>
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
  },
  header: {
    color: "#0d1b2a",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 120,
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
    paddingBottom: 10,  // space for bottom nav — adjust value to match your navbar height
  }
});