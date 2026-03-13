import AntDesign from "@expo/vector-icons/AntDesign";
import { useMemo, useState } from "react";
import { Pressable, ScrollView } from "react-native";
import Svg, { Circle as SvgCircle } from "react-native-svg";
import { Circle, Text, XStack, YStack } from "tamagui";

import { useHabits } from "@/lib/habits-context";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type CalendarCell = {
  day: number;
  dateKey: string;
};

function toDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function buildMonthCells(viewDate: Date): Array<CalendarCell | null> {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayWeekIndex = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<CalendarCell | null> = [];

  for (let i = 0; i < firstDayWeekIndex; i += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    cells.push({ day, dateKey: toDateKey(date) });
  }

  while (cells.length % 7 !== 0) {
    cells.push(null);
  }

  return cells;
}

function DayRing({ day, progress, isSelected }: { day: number; progress: number; isSelected: boolean }) {
  const size = 44;
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedProgress = Math.max(0, Math.min(1, progress));
  const strokeDashoffset = circumference * (1 - normalizedProgress);

  const progressColor =
    normalizedProgress >= 0.95 ? "#10B981" : normalizedProgress >= 0.5 ? "#F59E0B" : "#CBD5E1";

  return (
    <YStack width={size} height={size} alignItems="center" justifyContent="center">
      <Svg width={size} height={size} style={{ position: "absolute", transform: [{ rotate: "-90deg" }] }}>
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <SvgCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
        />
      </Svg>

      <Circle
        size={30}
        backgroundColor={isSelected ? "#FFF7ED" : "#FFFFFF"}
        borderWidth={isSelected ? 1 : 0}
        borderColor="#FDBA74"
      >
        <Text fontSize={12} fontWeight="700" color="#18181B">
          {day}
        </Text>
      </Circle>
    </YStack>
  );
}

export default function Statistics() {
  const { habits, completionLog, isLoadingHabits } = useHabits();
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(() => toDateKey(new Date()));

  const monthCells = useMemo(() => buildMonthCells(viewDate), [viewDate]);
  const monthTitle = `${MONTH_LABELS[viewDate.getMonth()]} ${viewDate.getFullYear()}`;
  const selectedCompletedIds = completionLog[selectedDateKey] ?? [];
  const selectedSet = useMemo(() => new Set(selectedCompletedIds), [selectedCompletedIds]);

  const completedHabits = useMemo(
    () => habits.filter((habit) => selectedSet.has(habit.id)),
    [habits, selectedSet]
  );
  const pendingHabits = useMemo(
    () => habits.filter((habit) => !selectedSet.has(habit.id)),
    [habits, selectedSet]
  );

  const totalHabits = habits.length;
  const completionRate = totalHabits === 0 ? 0 : Math.round((completedHabits.length / totalHabits) * 100);

  const goToPreviousMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#F3F4F6" }}
      contentContainerStyle={{ paddingBottom: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <YStack paddingHorizontal={16} paddingTop={56}>
        <YStack>
          <Text fontSize={36} fontWeight="800" color="#18181B" letterSpacing={-0.6}>
            Statistics
          </Text>
          <Text marginTop={6} fontSize={14} color="#71717A">
            Tap a day to inspect what was completed.
          </Text>
        </YStack>

        <YStack
          marginTop={20}
          backgroundColor="#FFFFFF"
          borderRadius={24}
          borderWidth={1}
          borderColor="#ECECF0"
          padding={16}
        >
          <XStack alignItems="center" justifyContent="space-between" marginBottom={14}>
            <Pressable
              onPress={goToPreviousMonth}
              style={({ pressed }) => ({
                width: 34,
                height: 34,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? "#F4F4F5" : "#FFFFFF",
                borderWidth: 1,
                borderColor: pressed ? "#D4D4D8" : "#ECECF0",
              })}
            >
              <AntDesign name="left" size={16} color="#3F3F46" />
            </Pressable>
            <Text fontSize={18} fontWeight="800" color="#18181B">
              {monthTitle}
            </Text>
            <Pressable
              onPress={goToNextMonth}
              style={({ pressed }) => ({
                width: 34,
                height: 34,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: pressed ? "#F4F4F5" : "#FFFFFF",
                borderWidth: 1,
                borderColor: pressed ? "#D4D4D8" : "#ECECF0",
              })}
            >
              <AntDesign name="right" size={16} color="#3F3F46" />
            </Pressable>
          </XStack>

          <XStack width="100%" marginBottom={10}>
            {WEEKDAY_LABELS.map((label) => (
              <YStack key={label} width="14.2857%" alignItems="center" justifyContent="center">
                <Text textAlign="center" fontSize={11} color="#71717A" fontWeight="700">
                  {label}
                </Text>
              </YStack>
            ))}
          </XStack>

          <XStack flexWrap="wrap" width="100%">
            {monthCells.map((cell, index) => {
              if (!cell) {
                return (
                  <YStack key={`empty-${index}`} width="14.2857%" height={52} alignItems="center" justifyContent="center" />
                );
              }

              const completedIds = completionLog[cell.dateKey] ?? [];
              const progress = totalHabits === 0 ? 0 : completedIds.length / totalHabits;

              return (
                <YStack key={cell.dateKey} width="14.2857%" height={52} alignItems="center" justifyContent="center">
                  <Pressable onPress={() => setSelectedDateKey(cell.dateKey)}>
                    <DayRing day={cell.day} progress={progress} isSelected={selectedDateKey === cell.dateKey} />
                  </Pressable>
                </YStack>
              );
            })}
          </XStack>
        </YStack>

        <YStack
          marginTop={16}
          backgroundColor="#FFFFFF"
          borderRadius={24}
          borderWidth={1}
          borderColor="#ECECF0"
          padding={16}
          gap={12}
        >
          <XStack alignItems="center" justifyContent="space-between">
            <Text fontSize={18} fontWeight="800" color="#18181B">
              {selectedDateKey}
            </Text>
            <XStack backgroundColor="#FFF1E6" borderRadius={999} paddingHorizontal={10} paddingVertical={4}>
              <Text fontSize={11} color="#B45309" fontWeight="800">
                {completionRate}% complete
              </Text>
            </XStack>
          </XStack>

          {isLoadingHabits ? (
            <Text fontSize={14} color="#71717A">
              Loading stats...
            </Text>
          ) : null}

          {!isLoadingHabits && totalHabits === 0 ? (
            <Text fontSize={14} color="#71717A">
              Create habits first to unlock statistics.
            </Text>
          ) : null}

          {!isLoadingHabits && totalHabits > 0 ? (
            <>
              <YStack>
                <Text fontSize={13} color="#047857" fontWeight="800" marginBottom={8}>
                  Completed ({completedHabits.length})
                </Text>
                {completedHabits.length === 0 ? (
                  <Text fontSize={13} color="#71717A">
                    No habits completed on this date.
                  </Text>
                ) : (
                  completedHabits.map((habit) => (
                    <XStack
                      key={`done-${habit.id}`}
                      alignItems="center"
                      justifyContent="space-between"
                      borderWidth={1}
                      borderColor="#D1FAE5"
                      backgroundColor="#ECFDF5"
                      borderRadius={14}
                      paddingVertical={10}
                      paddingHorizontal={12}
                      marginBottom={8}
                    >
                      <Text fontSize={14} color="#065F46" fontWeight="700">
                        {habit.title}
                      </Text>
                      <Text fontSize={12} color="#047857" fontWeight="700">
                        {habit.target}
                      </Text>
                    </XStack>
                  ))
                )}
              </YStack>

              <YStack>
                <Text fontSize={13} color="#9A3412" fontWeight="800" marginBottom={8}>
                  Pending ({pendingHabits.length})
                </Text>
                {pendingHabits.length === 0 ? (
                  <Text fontSize={13} color="#71717A">
                    Everything was completed.
                  </Text>
                ) : (
                  pendingHabits.map((habit) => (
                    <XStack
                      key={`pending-${habit.id}`}
                      alignItems="center"
                      justifyContent="space-between"
                      borderWidth={1}
                      borderColor="#FED7AA"
                      backgroundColor="#FFF7ED"
                      borderRadius={14}
                      paddingVertical={10}
                      paddingHorizontal={12}
                      marginBottom={8}
                    >
                      <Text fontSize={14} color="#7C2D12" fontWeight="700">
                        {habit.title}
                      </Text>
                      <Text fontSize={12} color="#9A3412" fontWeight="700">
                        {habit.target}
                      </Text>
                    </XStack>
                  ))
                )}
              </YStack>
            </>
          ) : null}
        </YStack>
      </YStack>
    </ScrollView>
  );
}