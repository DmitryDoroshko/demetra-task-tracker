import type { Request, Response, NextFunction } from "express";

import type { TaskService } from "../services/task.service.js";
import { type UpdateTaskDto, type CreateTaskDto, updateTaskSchema } from "../types/task.types.js";
import type { TypedRequest, TypedRequestParams } from "../types/express.types.js";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public createTask = async (
    req: Request<{}, {}, CreateTaskDto>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, description, is_completed } = req.body;

    try {
      const newTask = await this.taskService.createTask({ title, description, is_completed });
      res.status(201).json(newTask);
    } catch (e) {
      next(e);
    }
  };

  public getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tasks = await this.taskService.getAllTasks();
      res.status(200).json(tasks);
    } catch (e) {
      next(e);
    }
  };

  public getTaskById = async (req: TypedRequestParams<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({
        message: "Id not found",
      });
      return;
    }

    try {
      const taskFound = await this.taskService.getTaskById(id);

      if (!taskFound) {
        return res.status(404).json({
          message: "Task not found",
        });
      }

      res.status(200).json(taskFound);
    } catch (e) {
      next(e);
    }
  };

  public updateTask = async (req: TypedRequest<UpdateTaskDto, { id: string; }>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
      return res.status(404).json({
        message: "Id not found",
      });
    }

    const parsedUpdates = updateTaskSchema.safeParse(updates);

    if (!parsedUpdates.success) {
      return res.status(404).json({
        message: "Invalid data provided. Should have (title, description, is_completed).",
      });
    }

    try {
      const updatedTask = await this.taskService.updateTask(id, parsedUpdates.data);
      res.status(200).json(updatedTask);
    } catch (e) {
      next(e);
    }
  };

  public deleteTask = async (req: TypedRequestParams<{ id: string }>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        message: "Id not found",
      });
    }

    try {
      const deletedTask = await this.taskService.deleteTask(id);

      if (!deletedTask) {
        return res.status(404).json({
          message: "Task to delete not found",
        });
      }

      res.status(200).json(deletedTask);
    } catch (e) {
      next(e);
    }
  };

  public deleteAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.taskService.deleteAllTasks();
      res.status(200).json([]);
    } catch (e) {
      next(e);
    }
  };
}