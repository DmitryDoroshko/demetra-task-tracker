import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from '@fortawesome/fontawesome-svg-core';

const faEditIcon = faPenToSquare as IconProp;
const faDeleteIcon = faTrash as IconProp;

interface ITaskProps {
  name: string;
  dayAndTime: string;
  reminder: boolean;
  id: number;
  onEditTask: (idOfTaskToEdit: number,
               nameOfTaskToEdit: string,
               dayAndTimeOfTaskToEdit: string,
               reminderOfTaskToEdit: boolean) => void;
  onDeleteTask: (idOfTaskToRemove: number) => void;
  onToggleReminder: (idOfTaskForWhichToToggleReminder: number, newTaskReminder: boolean) => void;
}

function Task({name, dayAndTime, reminder, id, onEditTask, onDeleteTask, onToggleReminder}: ITaskProps) {
  const deleteTaskHandler = () => {
    onDeleteTask(id);
  };

  const toggleReminderHandler = () => {
    onToggleReminder(id, !reminder);
  };

  const editTaskHandler = () => {
    onEditTask(id, name, dayAndTime, reminder);
  };

  return (
    <li className={`tasks__task ${reminder ? "reminder" : ""}`} onDoubleClick={toggleReminderHandler}>
      <div className="tasks__content">
        <h3 className="task__text">{name}</h3>
        <p className="task__date">{dayAndTime}</p>
      </div>
      <div className="tasks__actions">
        <FontAwesomeIcon icon={faEditIcon} onClick={editTaskHandler}/>
        <FontAwesomeIcon icon={faDeleteIcon} onClick={deleteTaskHandler}/>
      </div>
    </li>
  );
}

export default Task;