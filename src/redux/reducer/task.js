// features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTasksAPI,
  createTaskAPI,
  updateTaskStatusAPI,
  registerAPI,
  loginAPI,
} from "../api/taskApi";


// register
export const register = createAsyncThunk("auth/register", async (payload) => {
  const data = await registerAPI(payload);
  return data;
});

// login
export const login = createAsyncThunk("auth/login", async (payload) => {
  const data = await loginAPI(payload);
  return data;
});

// get task list
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const data = await fetchTasksAPI();
  return data;
});

// add task
export const addTask = createAsyncThunk("tasks/addTask", async (task) => {
  const data = await createTaskAPI(task);
  return data;
});

// update task
export const updateTaskStatus = createAsyncThunk(
  "tasks/updateTaskStatus",
  async ({ id, status }) => {
    const data = await updateTaskStatusAPI(id, status);
    return data;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],
    loading: false,
    error: null,
    isAuthenticated :false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // login
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.list.push(action.payload);
      })

      // fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })

      // addTask
      .addCase(addTask.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      // updateTaskStatus
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      });
  },
});

export default tasksSlice.reducer;
