// components/TaskTable.js
import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import AddTaskFormModal from "../task/taskform";
import { useDispatch, usere, useSelector } from "react-redux";
import { createTaskAPI, fetchTasksAPI } from "@/redux/api/taskApi";
import { fetchTasks, updateTaskStatus } from "@/redux/reducer/task";

export default function TaskTable() {
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const tasksData = useSelector((state) => state.tasks.list);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  const handleAddTask = (newTask) => {
    try {
      dispatch(createTaskAPI(newTask));
    } catch (erro) {}
  };

  useEffect(() => {
    try {
      dispatch(fetchTasks());
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      setTasks(tasksData);
    } catch (error) {
      console.log("fetch error", error);
    }
  }, [tasksData]);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  const updateStatus = async (id, status) => {
    try {
      await dispatch(updateTaskStatus({ id, status }));
    } catch (error) {
      console.log("Failed to update status");
    }
  };

  return (
    <>
      <Box>
        <Button variant="contained" onClick={() => setModalOpen(true)}>
          Add Task
        </Button>

        <AddTaskFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmitTask={handleAddTask}
        />
      </Box>
      <Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell align="center">Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks &&
              tasks.map(({ id, name, status, created_at, updated_at }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{name || <i>(No Name)</i>}</TableCell>
                  <TableCell
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color:
                        status === "complete"
                          ? "green"
                          : status === "pending"
                          ? "orange"
                          : "blue",
                    }}
                  >
                    {status}
                  </TableCell>
                  <TableCell>{created_at}</TableCell>
                  <TableCell>{updated_at}</TableCell>
                  <TableCell align="center">
                    <Stack spacing={1} direction="row" justifyContent="center">
                      <Button
                        variant="contained"
                        size="small"
                        color="success"
                        disabled={status === "complete"}
                        onClick={() => updateStatus(id, "complete")}
                      >
                        Complete
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="warning"
                        disabled={status === "pending"}
                        onClick={() => updateStatus(id, "pending")}
                      >
                        Pending
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        color="info"
                        disabled={status === "inproccess"}
                        onClick={() => updateStatus(id, "inProcess")}
                      >
                        InProcess
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
