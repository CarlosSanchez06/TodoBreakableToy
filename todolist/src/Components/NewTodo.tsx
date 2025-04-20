import React, { useContext } from "react";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import styles from "./NewTodo.module.css";
import { TaskContext } from "../Context";

const NewTodo = () => {
  const contexto = useContext(TaskContext);
  if (!contexto) {
    throw new Error("No contexto");
  }
  const { taskList, setTaskList, page, setPage } = contexto;

  const [priority, setPriority] = React.useState("");
  const [state, setState] = React.useState("");
  const [text, setText] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setPriority(event.target.value as string);
  };

  const handleChangeState = (event: SelectChangeEvent) => {
    setState(event.target.value as string);
  };

  const handleNameState = (event: SelectChangeEvent) => {
    setText(event.target.value as string);
  };

  const handle_Search = () => {
    console.log(priority);
    console.log(state);
    console.log(text);
    api_getTaskFilter();
  };

  const api_getTaskFilter = () => {
    fetch(`http://localhost:9090/todo/filter/all?page=${page}&priority=${priority}&state=${state}&substring=${text}`)
    .then((response) => response.json())
    .then((data) => {
      const arrTemp = data.map((task: { id: any; state: any; text: any; priority: any; dueDate: any;doneDate: any; creationDate: any }) => {
        console.log(task.state)
        const taskTemp = {
          id: task.id,
          state: task.state ,
          text: task.text,
          priority: task.priority,
          dueDate: task.dueDate,
          doneDate: task.doneDate,
          creationDate: task.creationDate
        };
        return taskTemp;
      });
      setTaskList(arrTemp);
      console.log(taskList.length)
    })
  }

  return (
    <div className={styles.searchContainer}>
      <div className="SearchInfo">
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
            value={priority}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={"1"}>Low</MenuItem>
            <MenuItem value={"2"}>Medium</MenuItem>
            <MenuItem value={"3"}>High</MenuItem>
          </Select>
        </div>
        <div className={styles.samerow}>
          <div className={styles.searchItem}>
            <h3 className={styles.fieldName}>State</h3>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="State"
              onChange={handleChangeState}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={"done"}>Done</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
            </Select>
          </div>
          <Button variant="contained" onClick={handle_Search}>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTodo;
