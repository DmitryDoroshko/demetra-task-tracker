import { z } from "zod";

export interface ITask {
  id: string;
  title: string;
  description: string;
  is_completed: boolean;
}

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  is_completed: z.boolean().optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;