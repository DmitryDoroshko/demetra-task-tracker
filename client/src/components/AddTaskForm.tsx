import React, {useState} from 'react';

interface IAddTaskFormProps {
  onAddTask: (name: string, dayAndTime: string, reminder: boolean) => void;
}

function AddTaskForm(props: IAddTaskFormProps) {
  const [taskNameInput, setTaskNameInput] = useState<string>("");
  const [taskDayAndTimeInput, setTaskDayAndTimeInput] = useState<string>("");
  const [taskReminderInput, setTaskReminderInput] = useState<boolean>(false);

  const taskNameInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskNameInput(event.target.value);
  };

  const taskDayAndTimeInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskDayAndTimeInput(event.target.value);
  };

  const taskReminderInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskReminderInput(Boolean(event.target.checked));
  };

  const resetFormValues = () => {
    setTaskNameInput("");
    setTaskDayAndTimeInput("");
    setTaskReminderInput(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.onAddTask(taskNameInput, taskDayAndTimeInput, taskReminderInput);
    resetFormValues();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__controls">
        <label htmlFor="add-task-input">Task</label>
        <input type="text"
               placeholder={"Add Task"}
               id={"add-task-input"}
               value={taskNameInput}
               onChange={taskNameInputChangeHandler}/>
      </div>

      <div className="form__controls">
        <label htmlFor="add-day-and-time-input">Day & Time</label>
        <input type="text"
               placeholder={"Add Day and Time"}
               id={"add-day-and-time-input"}
               onChange={taskDayAndTimeInputChangeHandler}
               value={taskDayAndTimeInput}/>
      </div>

      <div className="form__reminder">
        <label className="form__reminder--label" htmlFor={"form-reminder-check"}>Set reminder</label>
        <input type="checkbox"
               className={"form__reminder--check"}
               id={"form-reminder-check"}
               onChange={taskReminderInputChangeHandler}
               checked={taskReminderInput}
        />
      </div>

      <div className="form__actions">
        <button className="button button--block">Save Task</button>
      </div>
    </form>
  );
}

export default AddTaskForm;