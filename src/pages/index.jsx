import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskTable from "@/component/table/tasktable";
import LayoutComponent from "@/component/home/layout";

export default function Home() {
   const [notification, setNotification] = useState(null);
    const [ws, setWs] = useState(null);
    const [notificationcount, setNotificationConunt] = useState(0);

  // Connect to WebSocket on component mount
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws/notifications/");

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log("Received notification:", data);
      setNotification(data);
      setNotificationConunt((prev) => prev + 1);
    };

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onerror = (e) => {
      console.error("WebSocket error", e);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <LayoutComponent notificationcount={notificationcount} notification={notification} >
      <TaskTable notification={notification} />
    </LayoutComponent>
  );
}
