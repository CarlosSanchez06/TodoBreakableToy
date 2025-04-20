import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import styles from "./NewTodo.module.css";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { PickerValue } from "@mui/x-date-pickers/internals";
import { TaskContext } from "../Context";

const CreateTask = () => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const contexto = useContext(TaskContext);
    if (!contexto) {
      throw new Error("No contexto");
    }
const { taskList, setTaskList } = contexto;
  const [priorityTask, setPriority] = useState("");
  const [value, setValue] = useState<Dayjs | null>(dayjs("2025-04-17"));
  const [textTask, setText] = useState("");
  const [date, setDate] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const handleNameState = (event: SelectChangeEvent) => {
    setText(event.target.value as string);
  };

  const handleDate = (newDate: PickerValue) => {
    const formatted = newDate?.format("YYYY-MM-DD");
    console.log(formatted);
    if(formatted)
        setDate(formatted);
    setValue(newDate);
  };

  const optionsPost = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      text: textTask,
      dueDate: date,
      state: "pending",
      doneDate: "",
      priority: priorityTask,
      creationDate: dayjs().format("YYYY-MM-DD"),
    }),
  };

  const api_create = () => {
    console.log(optionsPost);
    fetch(`http://localhost:9090/todo/create`,optionsPost)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        api_page();
      });
  };

  const api_page = () => {
    fetch(`http://localhost:9090/todo/nextPage?page=0`)
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
    <Box sx={style}>
      <div className={styles.searchItem}>
        <h3 className={styles.fieldName}>Name</h3>
        <input
          id="outlined-basic"
          className={styles.InputName}
          onChange={handleNameState}
        />
      </div>

      <div className={styles.searchItem}>
        <h3 className={styles.fieldName}>Priority</h3>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={priorityTask}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={"1"}>Low</MenuItem>
          <MenuItem value={"2"}>Medium</MenuItem>
          <MenuItem value={"3"}>High</MenuItem>
        </Select>
      </div>

      <div className={styles.searchItem}>
        <h3 className={styles.fieldName}>Date</h3>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker", "DatePicker"]}>
            <DatePicker
              label=""
              value={value}
              onChange={(newValue) => handleDate(newValue)}
            />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <Button onClick={api_create}>Create Task</Button>
    </Box>
  );
};

export default CreateTask;
