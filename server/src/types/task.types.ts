import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  is_completed: z.boolean().optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string(),
  is_completed: z.boolean().default(false),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;