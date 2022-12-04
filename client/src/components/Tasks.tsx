import React from 'react';
import {ITaskData} from "../types/types";
import Task from "./Task";

interface ITasksProps {
  tasks: Array<ITaskData>;
  onEditTask: (idOfTaskToEdit: number,
               nameOfTaskToEdit: string,
               dayAndTimeOfTaskToEdit: string,
               reminderOfTaskToEdit: boolean) => void;
  onDeleteTask: (idOfTaskToRemove: number) => void;
  onToggleReminder: (idOfTaskForWhichToToggleReminder: number, newTaskReminder: boolean) => void;
}

function Tasks({tasks, onEditTask, onDeleteTask, onToggleReminder}: ITasksProps) {
  return (
    <ul className="tasks">
      {tasks.length > 0 ? (tasks.map((task: ITaskData) => {
        return <Task key={task.id}
                     name={task.name}
                     id={task.id}
                     reminder={task.reminder}
                     dayAndTime={task.dayAndTime}
                     onDeleteTask={onDeleteTask}
                     onEditTask={onEditTask}
                     onToggleReminder={onToggleReminder}
        />;
      })) : <p className={"textCentered"}>No tasks available. Please add one.</p>}
    </ul>
  );
}

export default Tasks;