import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AppState } from "react-native";

import { INITIAL_HABITS } from "@/components/home/data";
import type { Habit } from "@/components/home/types";
import { useAuth } from "@/lib/auth-context";

type HabitsContextValue = {
  habits: Habit[];
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

export function HabitsProvider({ children }: PropsWithChildren) {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);
  const [isLoadingHabits, setIsLoadingHabits] = useState(true);
  const habitsRef = useRef<Habit[]>(INITIAL_HABITS);

  const storageKey = useMemo(() => buildHabitStorageKey(user?.uid), [user?.uid]);
  const resetDateKey = useMemo(() => buildHabitResetDateKey(user?.uid), [user?.uid]);

  useEffect(() => {
    habitsRef.current = habits;
  }, [habits]);

  useEffect(() => {
    let isMounted = true;

    const loadHabits = async () => {
      setIsLoadingHabits(true);
      try {
        const today = getTodayDateKey();
        const [[, savedHabits], [, savedResetDate]] = await AsyncStorage.multiGet([storageKey, resetDateKey]);
        if (!isMounted) {
          return;
        }

        let nextHabits: Habit[] = INITIAL_HABITS;

        if (savedHabits) {
          nextHabits = JSON.parse(savedHabits) as Habit[];
        }

        if (savedResetDate !== today) {
          nextHabits = resetDoneHabits(nextHabits);
          await AsyncStorage.multiSet([
            [storageKey, JSON.stringify(nextHabits)],
            [resetDateKey, today],
          ]);
        }

        if (!isMounted) {
          return;
        }

        setHabits(nextHabits);
      } catch {
        if (isMounted) {
          setHabits(resetDoneHabits(INITIAL_HABITS));
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
  }, [resetDateKey, storageKey]);

  const maybeResetHabitsForNewDay = useCallback(async () => {
    const today = getTodayDateKey();
    try {
      const savedResetDate = await AsyncStorage.getItem(resetDateKey);
      if (savedResetDate === today) {
        return;
      }

      const nextHabits = resetDoneHabits(habitsRef.current);
      setHabits(nextHabits);
      habitsRef.current = nextHabits;

      await AsyncStorage.multiSet([
        [storageKey, JSON.stringify(nextHabits)],
        [resetDateKey, today],
      ]);
    } catch {
      // Leave habits unchanged when daily reset check fails.
    }
  }, [resetDateKey, storageKey]);

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

  const persistHabits = useCallback(
    async (nextHabits: Habit[]) => {
      setHabits(nextHabits);
      habitsRef.current = nextHabits;
      try {
        await AsyncStorage.multiSet([
          [storageKey, JSON.stringify(nextHabits)],
          [resetDateKey, getTodayDateKey()],
        ]);
      } catch {
        // Keep in-memory updates even if persistence fails.
      }
    },
    [resetDateKey, storageKey]
  );

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

      await persistHabits([newHabit, ...habits]);
    },
    [habits, persistHabits]
  );

  const toggleHabit = useCallback(
    async (habitId: string) => {
      const nextHabits = habits.map((habit) =>
        habit.id === habitId ? { ...habit, done: !habit.done } : habit
      );
      await persistHabits(nextHabits);
    },
    [habits, persistHabits]
  );

  const markHabitDone = useCallback(
    async (habitId: string) => {
      const nextHabits = habits.map((habit) =>
        habit.id === habitId ? { ...habit, done: true } : habit
      );
      await persistHabits(nextHabits);
    },
    [habits, persistHabits]
  );

  const deleteHabit = useCallback(
    async (habitId: string) => {
      const nextHabits = habits.filter((habit) => habit.id !== habitId);
      await persistHabits(nextHabits);
    },
    [habits, persistHabits]
  );

  const value = useMemo(
    () => ({
      habits,
      isLoadingHabits,
      addHabit,
      toggleHabit,
      markHabitDone,
      deleteHabit,
    }),
    [addHabit, deleteHabit, habits, isLoadingHabits, markHabitDone, toggleHabit]
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