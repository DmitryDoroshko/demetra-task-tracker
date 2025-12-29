import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { Header } from "./components/Header/Header.tsx";
import { CustomInput } from "./components/CustomInput/CustomInput.tsx";
import { CustomButton } from "./components/CustomButton/CustomButton.tsx";
import { TasksInfoAndActions } from "./components/TasksInfoAndActions/TasksInfoAndActions.tsx";
import { Task } from "./components/Task/Task.tsx";
import type { ITask } from "./shared/types.ts";
import tasksService from "./services/tasks.service.ts";

const icon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.8 12.8L9.90005 9.9M11.4667 6.13334C11.4667 9.07886 9.0789 11.4667 6.13338 11.4667C3.18786 11.4667 0.800049 9.07886 0.800049 6.13334C0.800049 3.18782 3.18786 0.800003 6.13338 0.800003C9.0789 0.800003 11.4667 3.18782 11.4667 6.13334Z"
      stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newEnteredTaskTitle, setNewEnteredTaskTitle] = useState<string>("");
  const [newEnteredTaskDescription, setNewEnteredTaskDescription] = useState<string>("");
  const [newEnteredSearchTaskInput, setNewEnteredSearchTaskInput] = useState<string>("");

  const resetEnteredTaskFields = () => {
    setNewEnteredTaskTitle("");
    setNewEnteredTaskDescription("");
  };

  const handleTaskCompletionToggle = async (taskId: string): Promise<void> => {
    const taskFound = tasks.find(task => task.task_id === taskId);

    if (!taskFound) {
      console.log("No task found for task id " + taskId);
      return;
    }

    setTasks(prevTasks => prevTasks.map(task => {
      if (task.task_id === taskFound.task_id) {
        return { ...taskFound, is_completed: !taskFound.is_completed };
      }
      return task;
    }));
    const updatedTaskResult = await tasksService.updateTask(taskFound.task_id, {
      ...taskFound, is_completed: !taskFound.is_completed,
    });

    console.log("Updated Task Result", updatedTaskResult);
  };

  const handleNewTaskTitleChange = (newTaskTitle: string) => {
    setNewEnteredTaskTitle(newTaskTitle);
  };

  const handleNewEnteredTaskDescriptionChange = (newEnteredTaskDescription: string) => {
    setNewEnteredTaskDescription(newEnteredTaskDescription);
  };

  const handleSearchTaskInputChange = (newEnteredSearchTaskInput: string) => {
    setNewEnteredSearchTaskInput(newEnteredSearchTaskInput);
  };

  const handleAddNewTask = async () => {
    try {
      const newTaskToBeAdded = {
        title: newEnteredTaskTitle,
        description: newEnteredTaskDescription,
        is_completed: false,
      };

      const resultTask = await tasksService.createTask(newTaskToBeAdded);
      setTasks(prevTasks => [resultTask, ...prevTasks]);
      resetEnteredTaskFields();
      console.log("Task created", resultTask);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    const taskFound = tasks.find(task => task.task_id === taskId);

    if (!taskFound) {
      console.error("No task found for task id " + taskId);
      return;
    }

    const taskDeleted = await tasksService.deleteTask(taskFound.task_id);

    if (!taskDeleted) {
      console.error("No task deleted for task id " + taskId);
      return;
    }

    setTasks(prevTasks => prevTasks.filter(task => task.task_id !== taskDeleted.task_id));
  };

  const handleDeleteAllTasks = async () => {
    try {
      const response = await tasksService.deleteAllTasks();
      setTasks([]);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksFetched = await tasksService.getTasks();
      setTasks(tasksFetched);
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => {
    const search = newEnteredSearchTaskInput.trim().toLowerCase();

    if (!search) {
      return true;
    }

    return task.title.trim().includes(search)
      || task.description.trim().includes(search);
  });

  const renderedTasks = (filteredTasks || []).map((task: ITask) => (
    <Task key={task.task_id}
          completed={task.is_completed}
          title={task.title}
          description={task.description}
          id={task.task_id}
          onToggleCompleted={(id) => handleTaskCompletionToggle(id)}
          onDelete={() => handleDeleteTask(task.task_id)} />
  ));

  const totalTasks = tasks.length;

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.actionsRowFlex}>
          <CustomInput style={{ flex: 1, marginBottom: "2.4rem" }}
                       name={"taskTitle"}
                       placeholder={"New task title"}
                       value={newEnteredTaskTitle}
                       onInputChange={handleNewTaskTitleChange}
          />
        </div>
        <div className={styles.actionsRowFlex}>
          <CustomInput style={{ flex: 1, marginBottom: "2.4rem" }}
                       name={"taskDescription"}
                       placeholder={"New task description"}
                       value={newEnteredTaskDescription}
                       onInputChange={handleNewEnteredTaskDescriptionChange}
                       multipleRows={true}
          />
          <CustomButton type={"button"}
                        buttonType={"primary"}
                        onClick={handleAddNewTask}>Add</CustomButton>
        </div>
        <div className="actionsRow">
          <CustomInput icon={icon}
                       placeholder={"Search task"}
                       value={newEnteredSearchTaskInput}
                       onInputChange={handleSearchTaskInputChange} />
        </div>

        <main className={styles.tasksAppContainer}>
          <TasksInfoAndActions totalTasks={totalTasks} onDeleteAllTasks={handleDeleteAllTasks} />
          <ul className={styles.tasks}>
            {renderedTasks}
          </ul>
          <div className={styles.noTasksContainer}>
            {totalTasks === 0 && <p className={styles.noTasksText}>No tasks available. Please add some.</p>}
          </div>
        </main>
      </div>
    </div>
  );
};