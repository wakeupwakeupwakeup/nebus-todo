export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type Note = {
  id: number;
  title: string;
  createdAt: string;
  todoList: Todo[];
};
