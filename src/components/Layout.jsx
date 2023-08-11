import React from "react";
import { Outlet } from "react-router";

import { AppHeader } from "./AppHeader";
import "./Layout.css";
import { Drawer } from "./Drawer";

export function Layout() {
  return (
    <div className="app-layout">
      <AppHeader />
      <main className="app-main">
        <Drawer />
        <div className="app-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
