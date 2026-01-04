import { API_TASKS_URL } from "../shared/constants.ts";
import type { ITask } from "../shared/types.ts";

class TasksService {
  public async getTasks(): Promise<ITask[]> {
    const response = await fetch(API_TASKS_URL);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const tasksFetched = await response.json();
    return tasksFetched;
  }

  public async getTask(id: string): Promise<ITask> {
    const response = await fetch(`${API_TASKS_URL}/${id}`);
    const task = await response.json();
    return task;
  }

  public async createTask(task: Omit<ITask, "task_id">): Promise<ITask> {
    const response = await fetch(API_TASKS_URL, {
      method: "POST",
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        is_completed: task.is_completed,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const createdTask = await response.json();
    return createdTask;
  }

  public async deleteTask(id: string): Promise<ITask> {
    const response = await fetch(`${API_TASKS_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const task = await response.json();
    return task;
  }

  public async deleteAllTasks(): Promise<ITask[]> {
    const response = await fetch(`${API_TASKS_URL}`, { method: "DELETE" });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const tasks = await response.json();
    return tasks;
  }

  public async updateTask(id: string, task: Partial<Omit<ITask, "task_id">>): Promise<ITask> {
    if (Object.keys(task).length === 0) {
      throw new Error("No data to update provided.");
    }

    const response = await fetch(`${API_TASKS_URL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const updatedTask = await response.json();
    return updatedTask;
  }
}

const tasksService = new TasksService();

export default tasksService;