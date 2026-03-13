export type Story = {
  id: string;
  name: string;
  viewed: boolean;
  own?: boolean;
};

export type Habit = {
  id: string;
  title: string;
  target: string;
  streak: number;
  done: boolean;
};

export type Quote = {
  id: string;
  quote: string;
  author: string;
};
