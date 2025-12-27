import type { TaskService } from "../services/task.service.js";
import type { Request, Response, NextFunction } from "express";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, is_completed } = req.body;

    try {
      const newTask = await this.taskService.createTask({ title, description, isCompleted: is_completed });
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

  public getTaskById = async (req: Request, res: Response, next: NextFunction) => {
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

  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { title, description, is_completed } = req.body;

    if (!id) return res.status(404).json({
      message: "Id not found",
    });

    if (!title && !description && is_completed == null) {
      res.status(404).json({
        message: "Invalid data provided. Should have (title, description, is_completed).",
      });
    }
    try {
      const updatedTask = await this.taskService.updateTask(id, {
        title: title,
        description: description,
        isCompleted: is_completed,
      });
      res.status(200).json(updatedTask);
    } catch (e) {
      next(e);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
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
}