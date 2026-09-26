export type Status = "OPEN" | "IN_PROGRESS" | "DONE";
export type Priority = "LOW" | "MEDIUM" | "HIGH";

export interface Task {
  id: string;
  title: string;
  notes: string | null;
  status: Status;
  priority: Priority;
  project: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}
