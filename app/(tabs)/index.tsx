import { QUOTES, STORIES } from "@/components/home/data";
import { HabitRow } from "@/components/home/habit-row";
import { QuoteCard } from "@/components/home/quote-card";
import { StoryBubble } from "@/components/home/story-bubble";
import type { Habit } from "@/components/home/types";
import { useHabits } from "@/lib/habits-context";
import AntDesign from '@expo/vector-icons/AntDesign';
import { BlurView } from "expo-blur";
import { useState } from "react";
import { Modal, Platform, Pressable, View } from "react-native";
import { Circle, ScrollView, Separator, Text, XStack, YStack } from "tamagui";

export default function Index() {
  const { habits, isLoadingHabits, toggleHabit, markHabitDone, deleteHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const shouldUseBlur = Platform.OS === "ios";

  const completedCount = habits.filter((habit) => habit.done).length;
  const progress = habits.length === 0 ? 0 : completedCount / habits.length;

  const closeMenu = () => {
    setSelectedHabit(null);
  };

  const handleDeleteSelectedHabit = async () => {
    if (!selectedHabit) {
      return;
    }

    await deleteHabit(selectedHabit.id);
    closeMenu();
  };

  return (
    <ScrollView
      flex={1}
      backgroundColor="#F3F4F6"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      {/* <Circle
        position="absolute"
        top={-36}
        right={-28}
        size={176}
        backgroundColor="#FFE9D5"
        opacity={0.85}
      />
      <Circle
        position="absolute"
        top={228}
        left={-46}
        size={154}
        backgroundColor="#E8F5EE"
        opacity={0.8}
      /> */}

      <YStack paddingHorizontal={16} paddingTop={56}>
        <XStack alignItems="flex-start" justifyContent="space-between">
          <YStack>
            <Text fontSize={40} fontWeight="800" color="#18181B" letterSpacing={-0.6}>
              Streakify
            </Text>
            <Text marginTop={4} fontSize={14} color="#71717A">
              Your habits, your momentum.
            </Text>
          </YStack>
          <Circle size={42} backgroundColor="#FFFFFF" borderWidth={1} borderColor="#E4E4E7">
            <AntDesign name="menu" size={16} color="black" />
          </Circle>
        </XStack>

        <YStack
          marginTop={22}
          backgroundColor="#FFFFFF"
          borderRadius={24}
          borderWidth={1}
          borderColor="#ECECF0"
          padding={16}
        >
          <XStack alignItems="center" justifyContent="space-between" marginBottom={14}>
            <Text fontSize={20} fontWeight="700" color="#18181B">
              Stories
            </Text>
            <XStack backgroundColor="#FFF1E6" borderRadius={999} paddingHorizontal={10} paddingVertical={4}>
              <Text fontSize={11} color="#B45309" fontWeight="700">
                Social updates
              </Text>
            </XStack>
          </XStack>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 8 }}>
            {STORIES.map((story) => (
              <StoryBubble key={story.id} story={story} />
            ))}
          </ScrollView>
        </YStack>

        <YStack
          marginTop={20}
          backgroundColor="#FFFFFF"
          borderRadius={24}
          borderWidth={1}
          borderColor="#ECECF0"
          padding={16}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <YStack>
              <Text fontSize={20} fontWeight="700" color="#18181B">
                Today&apos;s habits
              </Text>
              <Text marginTop={4} fontSize={12} color="#71717A">
                Stay consistent and protect your streaks.
              </Text>
            </YStack>

            <XStack backgroundColor="#F4F4F5" borderRadius={999} paddingHorizontal={12} paddingVertical={6}>
              <Text fontSize={12} color="#3F3F46" fontWeight="700">
                {completedCount}/{habits.length} done
              </Text>
            </XStack>
          </XStack>

          <YStack marginTop={12} borderRadius={999} backgroundColor="#E5E7EB" height={8} overflow="hidden">
            <YStack backgroundColor="#F97316" height={8} width={`${progress * 100}%`} />
          </YStack>

          <YStack marginTop={14}>
            {isLoadingHabits ? (
              <Text fontSize={14} color="#71717A" paddingVertical={10}>
                Loading habits...
              </Text>
            ) : null}

            {!isLoadingHabits && habits.length === 0 ? (
              <Text fontSize={14} color="#71717A" paddingVertical={10}>
                Add your first habit from the Add Habit tab.
              </Text>
            ) : null}

            {!isLoadingHabits && habits.map((habit, index) => (
              <YStack key={habit.id}>
                <HabitRow
                  habit={habit}
                  onToggle={toggleHabit}
                  onMarkDone={markHabitDone}
                  onOpenMenu={(selected) => setSelectedHabit(selected)}
                />
                {index < habits.length - 1 ? <Separator borderColor="#F4F4F5" marginBottom={10} /> : null}
              </YStack>
            ))}
          </YStack>
        </YStack>

        <YStack marginTop={20}>
          <Text marginBottom={12} fontSize={20} fontWeight="700" color="#18181B">
            Daily motivation
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 8 }}>
            {QUOTES.map((quote) => (
              <QuoteCard key={quote.id} quote={quote} />
            ))}
          </ScrollView>
        </YStack>
      </YStack>

      <Modal
        transparent
        animationType="fade"
        visible={Boolean(selectedHabit)}
        statusBarTranslucent
        onRequestClose={closeMenu}
      >
        <View style={{ flex: 1 }}>
          {shouldUseBlur ? (
            <BlurView
              intensity={72}
              tint="light"
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
            />
          ) : (
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                backgroundColor: "rgba(241, 245, 249, 0.8)",
              }}
            />
          )}
          <Pressable
            onPress={closeMenu}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(17, 24, 39, 0.32)",
            }}
          />

          <View
            style={{
              flex: 1,
              justifyContent: "center",
              paddingHorizontal: 22,
            }}
          >
            <YStack
              backgroundColor="#FFFFFF"
              borderRadius={22}
              borderWidth={1}
              borderColor="#ECECF0"
              padding={18}
              gap={14}
            >
              <YStack>
                <Text fontSize={18} fontWeight="800" color="#18181B">
                  Habit options
                </Text>
                <Text marginTop={4} fontSize={13} color="#71717A">
                  {selectedHabit?.title}
                </Text>
              </YStack>

              <Pressable
                onPress={handleDeleteSelectedHabit}
                style={{
                  borderRadius: 14,
                  backgroundColor: "#FEF2F2",
                  borderWidth: 1,
                  borderColor: "#FECACA",
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text fontSize={14} fontWeight="800" color="#B91C1C">
                  Delete habit
                </Text>
              </Pressable>

              <Pressable
                onPress={closeMenu}
                style={{
                  borderRadius: 14,
                  backgroundColor: "#F4F4F5",
                  paddingVertical: 12,
                  alignItems: "center",
                }}
              >
                <Text fontSize={14} fontWeight="700" color="#3F3F46">
                  Cancel
                </Text>
              </Pressable>
            </YStack>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}