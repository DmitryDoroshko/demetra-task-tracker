import React, {useEffect, useState} from "react";
import "./index.scss";
import Header from "./components/Header";
import AddTaskForm from "./components/AddTaskForm";
import EditTaskForm from "./components/EditTaskForm";
import {ITaskData} from "./types/types";
import TasksService from "./services/tasks.service";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const [isEditingTask, setIsEditingTask] = useState<boolean>(false);
  const [isAddingTask, setIsAddingTask] = useState<boolean>(true);
  const [tasks, setTasks] = useState<ITaskData[] | any[]>([]);

  const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
  const [editedTaskName, setEditedTaskName] = useState<string>("");
  const [editedTaskDayAndTime, setEditedTaskDayAndTime] = useState<string>("");
  const [editedTaskReminder, setEditedTaskReminder] = useState<boolean>(false);

  const addTaskHandler = (taskName: string, taskDayAndTime: string, taskReminder: boolean) => {
    if (taskName.trim().length === 0) {
      alert("Task name should not be empty");
      return;
    }

    if (taskDayAndTime.trim().length === 0) {
      alert("Task day and time should not be empty");
      return;
    }

    const newTask = {
      name: taskName,
      dayAndTime: taskDayAndTime,
      reminder: taskReminder,
    };

    TasksService.create(newTask).then((response: any) => {
      setTasks(prevTasks => {
        return [response.data, ...prevTasks];
      });
    });
  };

  const getTaskById = (idOfTaskToGet: number) => {
    return tasks.find(task => task.id === idOfTaskToGet);
  };

  const editTaskHandler = (idOfTaskToEdit: number | null, newTaskName: string, newTaskDayAndTime: string, newTaskReminder: boolean) => {
    const taskToUpdate = {
      id: idOfTaskToEdit,
      name: newTaskName,
      dayAndTime: newTaskDayAndTime,
      reminder: newTaskReminder
    };
    TasksService
      .update(taskToUpdate, idOfTaskToEdit)
      .then(() => {
        setTasks(prevTasks => {
          const newTasks = prevTasks.map(task => {
            if (task.id !== idOfTaskToEdit) {
              return task;
            }
            return taskToUpdate;
          });
          return newTasks;
        });
      });
    cancelEditingHandler();
    setIsAddingTask(true);
  };

  const deleteTaskHandler = (idOfTaskToRemove: number) => {
    TasksService
      .delete(idOfTaskToRemove)
      .then(() => {
        setTasks(prevTasks => prevTasks.filter((task: ITaskData) => task.id !== idOfTaskToRemove));
      });
  };

  const headerButtonClickHandler = () => {
    setIsAddingTask(prev => !prev);
  };

  const toggleReminderHandler = (idOfTaskForWhichToToggleReminder: number, newTaskReminder: boolean) => {
    const taskToUpdate = {...getTaskById(idOfTaskForWhichToToggleReminder)};
    taskToUpdate.reminder = newTaskReminder;
    TasksService
      .update(taskToUpdate, idOfTaskForWhichToToggleReminder)
      .then(() => {
        setTasks(prevTasks => {
          const newTasks = prevTasks.map(task => {
            if (task.id !== idOfTaskForWhichToToggleReminder) {
              return task;
            }
            return {...task, reminder: newTaskReminder};
          });
          return newTasks;
        });
      });
  };

  const startEditing = (idOfTaskToEdit: number,
                        nameOfTaskToEdit: string,
                        dayAndTimeOfTaskToEdit: string,
                        reminderOfTaskToEdit: boolean) => {
    setIsAddingTask(false);
    setIsEditingTask(true);
    setEditedTaskId(idOfTaskToEdit);
    setEditedTaskName(nameOfTaskToEdit);
    setEditedTaskDayAndTime(dayAndTimeOfTaskToEdit);
    setEditedTaskReminder(reminderOfTaskToEdit);
  };

  const cancelEditingHandler = () => {
    setIsEditingTask(false);
    setEditedTaskId(null);
    setEditedTaskName("");
    setEditedTaskDayAndTime("");
    setEditedTaskReminder(false);
    setIsAddingTask(true);
  };

  useEffect(() => {
    TasksService.getAll().then((response: any) => {
      setTasks(response.data);
    });
  }, []);

  return <div className={"app"}>
    <div className="container">
      <div className="inner">
        <Header shouldShowAddForm={!isAddingTask} onClick={headerButtonClickHandler}/>

        <main className={"main"}>
          {isAddingTask && <AddTaskForm onAddTask={addTaskHandler}/>}
          {isEditingTask && <EditTaskForm onEditTask={editTaskHandler} idOfTaskToEdit={editedTaskId}
                                          taskDayAndTime={editedTaskDayAndTime} taskName={editedTaskName}
                                          taskReminder={editedTaskReminder} onCancelEditing={cancelEditingHandler}/>}
          <Tasks tasks={tasks}
                 onDeleteTask={deleteTaskHandler}
                 onToggleReminder={toggleReminderHandler}
                 onEditTask={startEditing}
          />
        </main>

        <Footer/>
      </div>
    </div>
  </div>
}

export default App;
