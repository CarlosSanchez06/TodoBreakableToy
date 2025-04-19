import styles from "./App.module.css";
import NewTodo from "./Components/NewTodo";
import TodoList from "./Components/TodoList";
import StatsTodo from "./Components/StatsTodo";
import { Button, Modal } from "@mui/material";

import { ProviderTask } from "./Provider";
import { useState } from "react";
import CreateTask from "./Components/CreateTask";

function App() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={styles.container}>
    <ProviderTask>
      <div className={styles.bg}>
        <h3 className={styles.title}>Task Manager</h3>
        <NewTodo></NewTodo>
        <Button variant="contained" className={styles.AddTask} onClick={handleOpen}>
          + New To Do
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CreateTask/>

        </Modal>
        <TodoList></TodoList>
        <StatsTodo></StatsTodo>
      </div>
    </ProviderTask>
    </div>
  );
}

export default App;
