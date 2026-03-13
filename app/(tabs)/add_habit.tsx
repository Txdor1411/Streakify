import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, TextInput } from "react-native";
import { ScrollView, Text, YStack } from "tamagui";

import { useHabits } from "@/lib/habits-context";

export default function AddHabit() {
  const router = useRouter();
  const { addHabit } = useHabits();

  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateHabit = async () => {
    if (!title.trim() || !target.trim()) {
      Alert.alert("Missing details", "Please add a habit name and a target.");
      return;
    }

    setIsSubmitting(true);
    await addHabit(title, target);
    setIsSubmitting(false);

    setTitle("");
    setTarget("");
    router.push("/(tabs)");
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor="#F3F4F6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <YStack paddingHorizontal={16} paddingTop={56}>
        <YStack>
          <Text fontSize={36} fontWeight="800" color="#18181B" letterSpacing={-0.6}>
            Create a new habit
          </Text>
          <Text marginTop={6} fontSize={14} color="#71717A">
            Define what you want to practice daily.
          </Text>
        </YStack>

        <YStack
          marginTop={22}
          backgroundColor="#FFFFFF"
          borderRadius={24}
          borderWidth={1}
          borderColor="#ECECF0"
          padding={16}
          gap={14}
        >
          <YStack gap={8}>
            <Text fontSize={14} fontWeight="700" color="#27272A">
              Habit name
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Example: Journal"
              placeholderTextColor="#A1A1AA"
              style={{
                borderWidth: 1,
                borderColor: "#E4E4E7",
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 12,
                fontSize: 15,
                color: "#18181B",
                backgroundColor: "#FAFAFA",
              }}
            />
          </YStack>

          <YStack gap={8}>
            <Text fontSize={14} fontWeight="700" color="#27272A">
              Daily target
            </Text>
            <TextInput
              value={target}
              onChangeText={setTarget}
              placeholder="Example: 10 minutes"
              placeholderTextColor="#A1A1AA"
              style={{
                borderWidth: 1,
                borderColor: "#E4E4E7",
                borderRadius: 14,
                paddingHorizontal: 14,
                paddingVertical: 12,
                fontSize: 15,
                color: "#18181B",
                backgroundColor: "#FAFAFA",
              }}
            />
          </YStack>

          <Pressable
            onPress={handleCreateHabit}
            disabled={isSubmitting}
            style={{
              backgroundColor: isSubmitting ? "#FDBA74" : "#F97316",
              borderRadius: 16,
              paddingVertical: 13,
              alignItems: "center",
            }}
          >
            <Text color="#FFFFFF" fontSize={15} fontWeight="800">
              {isSubmitting ? "Saving..." : "Save habit"}
            </Text>
          </Pressable>
        </YStack>

      </YStack>
    </ScrollView>
  );
}