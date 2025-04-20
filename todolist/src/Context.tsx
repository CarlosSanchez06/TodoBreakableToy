import { createContext } from "react";

export interface TaskInt{
        id: string
        state: string
        text: string
        priority: string
        dueDate: string
        doneDate: string
        creationDate: string
}

interface ContextoType{
    taskList: TaskInt[];
    setTaskList: React.Dispatch<React.SetStateAction<TaskInt[]>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const TaskContext = createContext<ContextoType|undefined>(undefined);