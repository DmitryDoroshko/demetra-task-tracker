import React from "react";

import styles from "./TasksInfoAndActions.module.scss";
import { CustomButton } from "../CustomButton/CustomButton.tsx";

export const TasksInfoAndActions: React.FC = () => {
  return <div className={styles.tasksInfo}>
    <div className={styles.totalTasksContainer}>
      <h2 className={styles.totalTasksHeading}>Total Tasks: </h2>
      <span className={styles.totalTasksCount}>3</span>
    </div>
    <CustomButton buttonType={"transparent"}>Delete All</CustomButton>
  </div>;
}