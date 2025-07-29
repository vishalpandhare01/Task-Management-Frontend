import { BaseUrl } from "@/const/baseurl";
import { EndPoint } from "@/const/enpoints";
import axios from "axios";

// register user
export const registerAPI = async (data) => {
  try {
    const url = BaseUrl + EndPoint.register;
    const res = await axios.post(url, data);
    return res.data;
  } catch (error) {
    console.log(error?.request?.response);
    const message =
      error?.request?.response ||
      error?.response?.data?.message ||
      error?.message ||
      "somthing went wrong";

    throw new Error(message);
  }
};

// login user
export const loginAPI = async (data) => {
  try {
    const url = BaseUrl + EndPoint.login;
    const res = await axios.post(url, data, { withCredentials: true });
    return res.data;
  } catch (error) {
    const message =
      error?.request?.response ||
      error?.response?.data?.message ||
      error?.message ||
      "somthing went wrong";
    throw new Error(message);
  }
};

// fetch task list
export const fetchTasksAPI = async () => {
  try {
    const url = BaseUrl + EndPoint.task;
    const res = await axios.get(url, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message || // axios's default error message
      "somthing went wrong";

    throw new Error(message);
  }
};

// create task
export const createTaskAPI = async (task) => {
  try {
    const url = BaseUrl + EndPoint.task;
    const res = await axios.post(url, task, { withCredentials: true });
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message || // axios's default error message
      "somthing went wrong";

    throw new Error(message);
  }
};

// update task
export const updateTaskStatusAPI = async (id, status) => {
  try {
    const url = BaseUrl + EndPoint.task + id;
    const res = await axios.patch(
      `${url}/`,
      { status },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message ||
      error?.message || // axios's default error message
      "somthing went wrong";

    throw new Error(message);
  }
};
