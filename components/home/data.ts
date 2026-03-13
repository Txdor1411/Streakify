import type { Habit, Quote, Story } from "@/components/home/types";

export const STORIES: Story[] = [
  { id: "own", name: "Your Story", viewed: false, own: true },
  { id: "1", name: "Mia", viewed: false },
  { id: "2", name: "Noah", viewed: true },
  { id: "3", name: "Avery", viewed: false },
  { id: "4", name: "Luca", viewed: true },
  { id: "5", name: "Elena", viewed: false },
];

export const INITIAL_HABITS: Habit[] = [
  { id: "h1", title: "Morning walk", target: "20 min", streak: 11, done: true },
  { id: "h2", title: "Read", target: "15 pages", streak: 7, done: false },
  { id: "h3", title: "Drink water", target: "2.5L", streak: 19, done: false },
  { id: "h4", title: "No sugar", target: "All day", streak: 4, done: false },
];

export const QUOTES: Quote[] = [
  {
    id: "q1",
    quote: "Consistency is a quiet superpower.",
    author: "Streakify Daily",
  },
  {
    id: "q2",
    quote: "Small actions done daily become life-changing results.",
    author: "James Clear",
  },
  {
    id: "q3",
    quote: "Win the morning, and the rest follows.",
    author: "Robin Sharma",
  },
];
