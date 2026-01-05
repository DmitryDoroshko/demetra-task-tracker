import { TaskService } from "../services/task.service.js";
import { TaskController } from "../controllers/task.controller.js";
import type { Express } from "express";

const taskService = new TaskService();
const taskController = new TaskController(taskService);

export default function routes(app: Express) {
  app.get("/healthcheck", (req, res) => {
    res.status(200).send("OK");
  });
  app.post("/api/tasks", taskController.createTask);
  app.get("/api/tasks", taskController.getAllTasks);
  app.get("/api/tasks/:id", taskController.getTaskById);
  app.patch("/api/tasks/:id", taskController.updateTask);
  app.delete("/api/tasks/:id", taskController.deleteTask);
  app.delete("/api/tasks", taskController.deleteAllTasks);
}