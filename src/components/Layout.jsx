import React from "react";
import { Outlet } from "react-router";

import { AppHeader } from "./AppHeader";
import "./Layout.css";

export function Layout() {
  return (
    <div className="app-layout">
      <AppHeader />
      <Outlet />
    </div>
  );
}
