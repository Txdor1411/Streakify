import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";

import { INITIAL_HABITS } from "@/components/home/data";
import type { Habit } from "@/components/home/types";
import { useAuth } from "@/lib/auth-context";

type HabitsContextValue = {
  habits: Habit[];
  completionLog: Record<string, string[]>;
  isLoadingHabits: boolean;
  addHabit: (title: string, target: string) => Promise<void>;
  toggleHabit: (habitId: string) => Promise<void>;
  markHabitDone: (habitId: string) => Promise<void>;
  deleteHabit: (habitId: string) => Promise<void>;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

function buildHabitStorageKey(userId: string | null | undefined): string {
  return `@streakify/habits/${userId ?? "guest"}`;
}

function buildHabitResetDateKey(userId: string | null | undefined): string {
  return `@streakify/habits-reset-date/${userId ?? "guest"}`;
}

function buildHabitCompletionLogKey(userId: string | null | undefined): string {
  return `@streakify/habits-completion-log/${userId ?? "guest"}`;
}

function createHabitId(): string {
  return `h-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function getTodayDateKey(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function resetDoneHabits(habits: Habit[]): Habit[] {
  return habits.map((habit) => (habit.done ? { ...habit, done: false } : habit));
}

function updateCompletionLogForHabit(
  completionLog: Record<string, string[]>,
  dateKey: string,
  habitId: string,
  done: boolean
): Record<string, string[]> {
  const current = completionLog[dateKey] ?? [];
  const asSet = new Set(current);

  if (done) {
    asSet.add(habitId);
  } else {
    asSet.delete(habitId);
  }

  return {
    ...completionLog,
    [dateKey]: Array.from(asSet),
  };
}

function removeHabitFromCompletionLog(
  completionLog: Record<string, string[]>,
  habitId: string
): Record<string, string[]> {
  const nextLog: Record<string, string[]> = {};

  Object.entries(completionLog).forEach(([dateKey, completedHabits]) => {
    nextLog[dateKey] = completedHabits.filter((id) => id !== habitId);
  });

  return nextLog;
}

export function HabitsProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [completionLog, setCompletionLog] = useState<Record<string, string[]>>({});
  const [isLoadingHabits, setIsLoadingHabits] = useState(true);
  const habitsRef = useRef<Habit[]>(INITIAL_HABITS);
  const completionLogRef = useRef<Record<string, string[]>>({});

  const storageKey = useMemo(() => buildHabitStorageKey(user?.uid), [user?.uid]);
  const resetDateKey = useMemo(() => buildHabitResetDateKey(user?.uid), [user?.uid]);
  const completionLogKey = useMemo(() => buildHabitCompletionLogKey(user?.uid), [user?.uid]);

  useEffect(() => {
    habitsRef.current = habits;
  }, [habits]);

  useEffect(() => {
    completionLogRef.current = completionLog;
  }, [completionLog]);

  useEffect(() => {
    let isMounted = true;

    const loadHabits = async () => {
      setIsLoadingHabits(true);
      try {
        const today = getTodayDateKey();
        const [[, savedHabits], [, savedResetDate], [, savedCompletionLog]] = await AsyncStorage.multiGet([
          storageKey,
          resetDateKey,
          completionLogKey,
        ]);
        if (!isMounted) {
          return;
        }

        let nextHabits: Habit[] = INITIAL_HABITS;
        let nextCompletionLog: Record<string, string[]> = {};

        if (savedHabits) {
          nextHabits = JSON.parse(savedHabits) as Habit[];
        }

        if (savedCompletionLog) {
          nextCompletionLog = JSON.parse(savedCompletionLog) as Record<string, string[]>;
        }

        if (savedResetDate !== today) {
          nextHabits = resetDoneHabits(nextHabits);
          await AsyncStorage.multiSet([
            [storageKey, JSON.stringify(nextHabits)],
            [resetDateKey, today],
            [completionLogKey, JSON.stringify(nextCompletionLog)],
          ]);
        }

        if (!isMounted) {
          return;
        }

        setHabits(nextHabits);
        setCompletionLog(nextCompletionLog);
      } catch {
        if (isMounted) {
          setHabits(resetDoneHabits(INITIAL_HABITS));
          setCompletionLog({});
        }
      } finally {
        if (isMounted) {
          setIsLoadingHabits(false);
        }
      }
    };

    loadHabits();

    return () => {
      isMounted = false;
    };
  }, [completionLogKey, resetDateKey, storageKey]);

  const persistHabitsAndCompletionLog = useCallback(
    async (nextHabits: Habit[], nextCompletionLog: Record<string, string[]>, resetDate: string) => {
      setHabits(nextHabits);
      setCompletionLog(nextCompletionLog);
      habitsRef.current = nextHabits;
      completionLogRef.current = nextCompletionLog;

      try {
        await AsyncStorage.multiSet([
          [storageKey, JSON.stringify(nextHabits)],
          [resetDateKey, resetDate],
          [completionLogKey, JSON.stringify(nextCompletionLog)],
        ]);
      } catch {
        // Keep in-memory updates even if persistence fails.
      }
    },
    [completionLogKey, resetDateKey, storageKey]
  );

  const maybeResetHabitsForNewDay = useCallback(async () => {
    const today = getTodayDateKey();
    try {
      const savedResetDate = await AsyncStorage.getItem(resetDateKey);
      if (savedResetDate === today) {
        return;
      }

      const nextHabits = resetDoneHabits(habitsRef.current);
      await persistHabitsAndCompletionLog(nextHabits, completionLogRef.current, today);
    } catch {
      // Leave habits unchanged when daily reset check fails.
    }
  }, [persistHabitsAndCompletionLog, resetDateKey]);

  useEffect(() => {
    let previousAppState = AppState.currentState;

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      const becameActive = previousAppState !== "active" && nextAppState === "active";
      if (becameActive) {
        void maybeResetHabitsForNewDay();
      }
      previousAppState = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, [maybeResetHabitsForNewDay]);

  const addHabit = useCallback(
    async (title: string, target: string) => {
      const trimmedTitle = title.trim();
      const trimmedTarget = target.trim();
      if (!trimmedTitle || !trimmedTarget) {
        return;
      }

      const newHabit: Habit = {
        id: createHabitId(),
        title: trimmedTitle,
        target: trimmedTarget,
        streak: 0,
        done: false,
      };

      await persistHabitsAndCompletionLog([newHabit, ...habits], completionLog, getTodayDateKey());
    },
    [completionLog, habits, persistHabitsAndCompletionLog]
  );

  const toggleHabit = useCallback(
    async (habitId: string) => {
      let hasMatch = false;
      let nextDone = false;
      const nextHabits = habits.map((habit) => {
        if (habit.id !== habitId) {
          return habit;
        }

        hasMatch = true;
        nextDone = !habit.done;
        return { ...habit, done: nextDone };
      });

      if (!hasMatch) {
        return;
      }

      const nextCompletionLog = updateCompletionLogForHabit(completionLog, getTodayDateKey(), habitId, nextDone);
      await persistHabitsAndCompletionLog(nextHabits, nextCompletionLog, getTodayDateKey());
    },
    [completionLog, habits, persistHabitsAndCompletionLog]
  );

  const markHabitDone = useCallback(
    async (habitId: string) => {
      const nextHabits = habits.map((habit) =>
        habit.id === habitId ? { ...habit, done: true } : habit
      );
      const nextCompletionLog = updateCompletionLogForHabit(completionLog, getTodayDateKey(), habitId, true);
      await persistHabitsAndCompletionLog(nextHabits, nextCompletionLog, getTodayDateKey());
    },
    [completionLog, habits, persistHabitsAndCompletionLog]
  );

  const deleteHabit = useCallback(
    async (habitId: string) => {
      const nextHabits = habits.filter((habit) => habit.id !== habitId);
      const nextCompletionLog = removeHabitFromCompletionLog(completionLog, habitId);
      await persistHabitsAndCompletionLog(nextHabits, nextCompletionLog, getTodayDateKey());
    },
    [completionLog, habits, persistHabitsAndCompletionLog]
  );

  const value = useMemo(
    () => ({
      habits,
      completionLog,
      isLoadingHabits,
      addHabit,
      toggleHabit,
      markHabitDone,
      deleteHabit,
    }),
    [addHabit, completionLog, deleteHabit, habits, isLoadingHabits, markHabitDone, toggleHabit]
  );

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits(): HabitsContextValue {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within HabitsProvider");
  }

  return context;
}