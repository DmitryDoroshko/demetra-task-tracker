import React from "react";

import styles from "./TasksInfoAndActions.module.scss";
import { CustomButton } from "../CustomButton/CustomButton.tsx";

type TasksInfoAndActionsProps = {
  totalTasks: number;
  onDeleteAllTasks: () => void
};

export const TasksInfoAndActions: React.FC<TasksInfoAndActionsProps> = ({ totalTasks, onDeleteAllTasks }) => {
  return <div className={styles.tasksInfo}>
    <div className={styles.totalTasksContainer}>
      <h2 className={styles.totalTasksHeading}>Total Tasks: </h2>
      <span className={styles.totalTasksCount}>{totalTasks}</span>
    </div>
    <CustomButton buttonType={"transparent"} onClick={onDeleteAllTasks}>Delete All</CustomButton>
  </div>;
};