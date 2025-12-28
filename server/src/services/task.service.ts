import pool from "../db/db.config.js";

export class TaskService {
  public async getAllTasks() {
    const tasksFound = await pool.query("SELECT * FROM tasks ORDER BY task_id ASC");
    return tasksFound.rows;
  }

  public async getTaskById(id: string) {
    const taskFound = await pool.query("SELECT * FROM tasks WHERE task_id = $1", [id]);
    return taskFound.rows[0];
  }

  public async createTask(taskData: { title: string, description: string, isCompleted?: boolean }) {
    if (taskData.isCompleted === null) {
      taskData.isCompleted = false;
    }
    if (!taskData.title || !taskData.description || taskData.description.length === 0 || taskData.title.length > 255) {
      throw new Error("Invalid title or description");
    }

    const result = await pool.query("INSERT INTO tasks (title, description, is_completed) VALUES ($1, $2, $3) RETURNING *", [taskData.title, taskData.description, taskData.isCompleted]);

    return result.rows[0];
  }

  public async updateTask(id: string, taskData: { title?: string, description?: string, isCompleted?: boolean }) {
    const foundTask = await this.getTaskById(id);

    if (!foundTask) {
      throw new Error("Task to update not found.");
    }

    const updatedTask = {
      title: taskData.title ?? "",
      description: taskData.description ?? "",
      isCompleted: taskData.isCompleted ?? false,
    };

    const result = await pool.query("UPDATE tasks SET title = $1, description = $2, is_completed = $3 WHERE task_id = $4 RETURNING *", [updatedTask.title, updatedTask.description, updatedTask.isCompleted, id]);

    return result.rows[0];
  }

  public async deleteTask(id: string) {
    const result = await pool.query("DELETE FROM tasks WHERE task_id = $1 RETURNING *", [id]);

    console.log(`Attempted to delete task with ID: ${id}. Rows affected: ${result.rowCount}`);

    return result.rows[0];
  }

  public async deleteAllTasks() {
    const result = await pool.query("DELETE FROM tasks RETURNING *");
    console.log(`Attempted to delete all tasks with ID: ${result.rowCount}`);
    return result.rows;
  }
}

