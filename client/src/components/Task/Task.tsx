import React, { useState } from "react";
import classNames from "classnames";

import styles from "./Task.module.scss";
import { CustomCheckbox } from "../CustomCheckbox/CustomCheckbox.tsx";
import { TasksLabelTexts } from "./TaskLabelTexts.tsx";

type TaskProps = {
  completed: boolean;
  onToggleCompleted: (id: string) => void;
  onDelete: (id: string) => void;
  title: string;
  description: string;
  id: string;
};

export const Task: React.FC<TaskProps> = (
  {
    completed,
    title,
    description,
    onDelete,
    id,
    onToggleCompleted,
  }) => {
  const [isCompleted, setIsCompleted] = useState(completed);

  const toggleCompleted = () => {
    setIsCompleted(prev => !prev);
    onToggleCompleted(id);
  };

  const classesMain = classNames([
    styles.task,
    completed && styles.completed,
  ]);

  return (
    <li className={classesMain}>
      <div className={styles.taskInner}>
        <div className={styles.taskLeft}>
          <CustomCheckbox checked={isCompleted} onChange={toggleCompleted} label={
            <TasksLabelTexts title={title} description={description} />}
          />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.3334 4L6.00002 11.3333L2.66669 8" stroke="#F5F5F5" strokeWidth="1.6"
                  strokeLinecap="round" strokeLinejoin="round" />
          </svg>

        </div>
        <div className={styles.taskRight}>
          <button className={styles.taskDeleteButton} onClick={() => onDelete(id)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="#757575" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
};