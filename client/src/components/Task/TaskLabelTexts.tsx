import React from "react";
import styles from "./Task.module.scss";

type TasksLabelTextsProps = {
  title: string;
  description: string;
};

export const TasksLabelTexts: React.FC<TasksLabelTextsProps> = ({ title, description }) => {
  return <div className={styles.taskTexts}>
    <p className={styles.taskTitle}>{title}</p>
    <p className={styles.taskDescription}>
      {description}
    </p>
  </div>;
};