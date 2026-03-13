import type { Habit } from "@/components/home/types";
import { Flame } from "lucide-react-native";
import { useRef } from "react";
import { Pressable } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Circle, Text, XStack, YStack } from "tamagui";

type HabitRowProps = {
  habit: Habit;
  onToggle: (id: string) => void;
  onMarkDone: (id: string) => void;
  onOpenMenu: (habit: Habit) => void;
};

export function HabitRow({ habit, onToggle, onMarkDone, onOpenMenu }: HabitRowProps) {
  const ignoreNextPress = useRef(false);
  const swipeableRef = useRef<Swipeable | null>(null);

  const handlePress = () => {
    if (ignoreNextPress.current) {
      ignoreNextPress.current = false;
      return;
    }
    onToggle(habit.id);
  };

  const handleLongPress = () => {
    ignoreNextPress.current = true;
    onOpenMenu(habit);
  };

  const handleSwipeOpen = (direction: "left" | "right") => {
    if (direction === "left" && !habit.done) {
      onMarkDone(habit.id);
    }

    swipeableRef.current?.close();
  };

  return (
    <Swipeable
      ref={swipeableRef}
      friction={1.7}
      leftThreshold={42}
      overshootLeft={false}
      onSwipeableOpen={handleSwipeOpen}
      renderLeftActions={() => (
        <YStack
          width={120}
          marginBottom={10}
          borderRadius={16}
          backgroundColor="#D1FAE5"
          justifyContent="center"
          alignItems="center"
        >
        </YStack>
      )}
    >
      <Pressable onPress={handlePress} onLongPress={handleLongPress} delayLongPress={240} style={{ borderRadius: 16 }}>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          borderWidth={1}
          borderColor={habit.done ? "#A7F3D0" : "#E4E4E7"}
          backgroundColor={habit.done ? "#ECFDF5" : "#FAFAFA"}
          borderRadius={16}
          paddingVertical={12}
          paddingHorizontal={14}
          marginBottom={10}
        >
          <YStack flex={1} paddingRight={10}>
            <Text fontSize={16} fontWeight="700" color={habit.done ? "#065F46" : "#27272A"}>
              {habit.title}
            </Text>
            <XStack marginTop={6} alignItems="center" gap={5}>
              <Flame size={14} color={habit.done ? "#047857" : "#f97316"} />
              <Text fontSize={12} color={habit.done ? "#047857" : "#71717A"}>
                {habit.streak} day streak • {habit.target}
              </Text>
            </XStack>
          </YStack>

          <Circle
            size={26}
            borderWidth={1.5}
            borderColor={habit.done ? "#059669" : "#A1A1AA"}
            backgroundColor={habit.done ? "#059669" : "#FFFFFF"}
          >
            <Text color={habit.done ? "#FFFFFF" : "#A1A1AA"} fontSize={14} fontWeight="800">
              {habit.done ? "✓" : ""}
            </Text>
          </Circle>
        </XStack>
      </Pressable>
    </Swipeable>
  );
}
