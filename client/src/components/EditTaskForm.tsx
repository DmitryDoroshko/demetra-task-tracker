import React, {useState} from 'react';

interface IEditTaskFormProps {
  idOfTaskToEdit: number | null;
  taskName: string;
  taskDayAndTime: string;
  taskReminder: boolean;
  onEditTask: (idOfTaskToEdit: number | null, newTaskName: string, newTaskDayAndTime: string, newTaskReminder: boolean) => void;
  onCancelEditing: () => void;
}

function EditTaskForm({idOfTaskToEdit, taskName, taskDayAndTime, taskReminder, onEditTask, onCancelEditing}: IEditTaskFormProps) {
  const [taskToEditNameInput, setTaskToEditNameInput] = useState<string>(taskName);
  const [taskDayAndTimeInput, setTaskDayAndTimeInput] = useState<string>(taskDayAndTime);
  const [taskReminderInput, setTaskReminderInput] = useState<boolean>(taskReminder);

  const taskNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskToEditNameInput(event.target.value);
  };

  const taskDayAndTimeInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDayAndTimeInput(event.target.value);
  };

  const taskReminderInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskReminderInput(Boolean(event.target.checked));
  };

  const resetFormValues = () => {
    setTaskToEditNameInput("");
    setTaskDayAndTimeInput("");
    setTaskReminderInput(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEditTask(idOfTaskToEdit, taskToEditNameInput, taskDayAndTimeInput, taskReminderInput);
    resetFormValues();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__controls">
        <label htmlFor="edit-task-input">Task to edit</label>
        <input type="text" placeholder={"Edit Task"} id={"edit-task-input"} value={taskToEditNameInput}
               onChange={taskNameInputChangeHandler}/>
      </div>

      <div className="form__controls">
        <label htmlFor="edit-day-and-time-input">Day & Time</label>
        <input type="text" placeholder={"Edit Day and Time"} id={"edit-day-and-time-input"} value={taskDayAndTimeInput}
               onChange={taskDayAndTimeInputChangeHandler}/>
      </div>

      <div className="form__reminder">
        <label className="form__reminder--label" htmlFor={"form-reminder-check"}>Set reminder</label>
        <input type="checkbox" className={"form__reminder--check"} id={"form-reminder-check"}
               onChange={taskReminderInputChangeHandler} checked={taskReminderInput}/>
      </div>

      <div className="form__actions">
        <button className="button">Save Edited Task</button>
        <button className="button button--active" onClick={onCancelEditing}>Cancel Editing</button>
      </div>
    </form>
  );
}

export default EditTaskForm;