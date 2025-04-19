import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox, Modal } from "@mui/material";
import styles from "./TodoList.module.css";
import { useContext, useEffect, useState } from "react";
import { TaskContext, TaskInt } from "../Context";
import EditTask from "./EditTask";

const TodoList: React.FC = () => {
  const contexto = useContext(TaskContext);
  if (!contexto) {
    throw new Error("No contexto");
  }
  const { taskList, setTaskList } = contexto;

  const [page, setPage] = useState(0);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const sortPriority = () => {
    fetch(`http://localhost:9090/todo/sort/priority?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const arrTemp = data.map(
          (task: {
            id: any;
            state: any;
            text: any;
            priority: any;
            dueDate: any;
          }) => {
            console.log(task.state);
            const taskTemp = {
              id: task.id,
              state: task.state,
              text: task.text,
              priority: task.priority,
              dueDate: task.dueDate,
            };
            return taskTemp;
          }
        );
        setTaskList(arrTemp);
        console.log(taskList.length);
      });
  };

  const sortDueDate = () => {
    fetch(`http://localhost:9090/todo/sort/date?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const arrTemp = data.map(
          (task: {
            id: any;
            state: any;
            text: any;
            priority: any;
            dueDate: any;
          }) => {
            console.log(task.state);
            const taskTemp = {
              id: task.id,
              state: task.state,
              text: task.text,
              priority: task.priority,
              dueDate: task.dueDate,
            };
            return taskTemp;
          }
        );
        setTaskList(arrTemp);
        console.log(taskList.length);
      });
  };

  const api_page = () => {
    fetch(`http://localhost:9090/todo/nextPage?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Page" + page);
        const arrTemp = data.map(
          (task: {
            id: any;
            state: any;
            text: any;
            priority: any;
            dueDate: any;
          }) => {
            const taskTemp = {
              id: task.id,
              state: task.state,
              text: task.text,
              priority: task.priority,
              dueDate: task.dueDate,
            };
            return taskTemp;
          }
        );
        setTaskList(arrTemp);
        console.log(taskList.length);
      });
  };

  useEffect(() => {
    api_page();
  }, [page]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const optionsPut = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
  };
  const handleDelete = (id: string) => {
    console.log("id " + id);
    fetch(`http://localhost:9090/todo/${id}/delete`, optionsPut)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        api_page();
      });
  };

  const [id,setId] = useState('-1');
  useEffect(() => {
    handleOpen();
  }, [id]);

  const handleEdit = (_id: string) => {
    setId(_id);
    if(id == _id ){
      handleOpen();
    }
  };

const optionsPutState = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      
    }),
  };


  const taskDone = (_id: String) => {
    console.log("optionsPutState");
    fetch(`http://localhost:9090/todo/${_id}/done`,optionsPutState)
      .then((response) => response.json())
      .then((data) => {
        console.log("data");
        api_page();
      });
  };

  const taskUnDone = (_id: String) => {
    console.log(optionsPutState);
    fetch(`http://localhost:9090/todo/${_id}/undone`,optionsPutState)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        api_page();
      });
  };


  const handleState = (_id: String, _state: String) => {
    if(_state== 'pending'){
      taskDone(_id)
    }else{
      taskUnDone(_id)
    }
    console.log('Heello')
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Done/Undone</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">
                Priority
                <button onClick={sortPriority}>Order</button>
              </TableCell>
              <TableCell align="right">
                Due Date
                <button onClick={sortDueDate}>Order</button>
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taskList.map((task: TaskInt) => (
              <TableRow
                key={task.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">
                  
                  <Button onClick={() => handleState(task.id,task.state)}>
                    {task.state}
                  </Button>
                  
                  </TableCell>
                <TableCell align="right">{task.text}</TableCell>
                <TableCell align="right">{task.priority}</TableCell>
                <TableCell align="right">{task.dueDate}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => handleEdit(task.id)}>Edit</Button>

                  <Button onClick={() => handleDelete(task.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.pagination}>
        <Button onClick={handlePreviousPage}>Previous</Button>
        {page}
        <Button onClick={handleNextPage}>Next</Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <EditTask id={id} />
      </Modal>
    </div>
  );
};

export default TodoList;
