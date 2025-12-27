import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";

import { Header } from "./components/Header/Header.tsx";
import { CustomInput } from "./components/CustomInput/CustomInput.tsx";
import { CustomButton } from "./components/CustomButton/CustomButton.tsx";
import { TasksInfoAndActions } from "./components/TasksInfoAndActions/TasksInfoAndActions.tsx";
import { Task } from "./components/Task/Task.tsx";
import type { ITask } from "./shared/types.ts";
import { API_TASKS_URL } from "./shared/constants.ts";

const icon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.8 12.8L9.90005 9.9M11.4667 6.13334C11.4667 9.07886 9.0789 11.4667 6.13338 11.4667C3.18786 11.4667 0.800049 9.07886 0.800049 6.13334C0.800049 3.18782 3.18786 0.800003 6.13338 0.800003C9.0789 0.800003 11.4667 3.18782 11.4667 6.13334Z"
      stroke="#1E1E1E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleTaskCompletionToggle = (taskId: string): void => {
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
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(API_TASKS_URL);
      const tasksFetched = await response.json();
      setTasks(tasksFetched);
    };

    fetchTasks();
  }, []);

  const renderedTasks = (tasks || []).map((task: ITask) => (
    <Task key={task.task_id} completed={task.is_completed} title={task.title} description={task.description}
          id={task.task_id} onToggleCompleted={(id) => handleTaskCompletionToggle(id)} />
  ));

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />
        <div className={styles.actionsRowFlex}>
          <CustomInput style={{ flex: 1, marginBottom: "2.4rem" }}
                       name={"taskTitle"}
                       placeholder={"New task title"} />
          <CustomButton type={"button"} buttonType={"primary"}>Add</CustomButton>
        </div>
        <div className="actionsRow">
          <CustomInput icon={icon} placeholder={"Search task"} />
        </div>

        <main className={styles.tasksAppContainer}>
          <TasksInfoAndActions />
          <ul className={styles.tasks}>
            {renderedTasks}
          </ul>
        </main>
      </div>
    </div>
  );
};