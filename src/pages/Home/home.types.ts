export type Id = number;

export type ITaskItem = {
  id: Id;
  content: string;
  title?: string;
};

export type ITaskForm = {
  content: string;
  title?: string;
}