import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskTable from "@/component/table/tasktable";
import LayoutComponent from "@/component/home/layout";
import Notification from "@/component/share/notification";

export default function Home() {
  return (
    <LayoutComponent>
      <TaskTable />
    </LayoutComponent>
  );
}
