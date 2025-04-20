import React, { useState, useEffect } from "react";
import { TaskContext, TaskInt } from "./Context";

interface ProviderTaskProps {
  children: React.ReactNode;
}

export const ProviderTask: React.FC<ProviderTaskProps> = ({ children }) => {
  const [taskList, setTaskList] = useState<TaskInt[]>([]);
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    api_GetTasks();
  }, []);

  const api_GetTasks = () => {
    fetch(`http://localhost:9090/todo/getAll?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const arrTemp = data.map(
          (task: {
            id: any;
            state: any;
            text: any;
            priority: any;
            dueDate: any;
            doneDate: any;
            creationDate: any;
          }) => {
            console.log(task.state);
            const taskTemp = {
              id: task.id,
              state: task.state,
              text: task.text,
              priority: task.priority,
              dueDate: task.dueDate,
              doneDate: task.doneDate,
              creationDate: task.creationDate
            };
            return taskTemp;
          }
        );
        setTaskList(arrTemp);
        console.log(taskList.length);
      });
  };

  return (
    <TaskContext.Provider value={{ taskList, setTaskList, page, setPage }}>
      {children}
    </TaskContext.Provider>
  );
};
