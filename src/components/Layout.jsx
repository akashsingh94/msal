import React from "react";
import { AppHeader } from "./AppHeader";
import { Outlet } from "react-router";

export function Layout() {
  return (
    <div>
      <AppHeader />
      <Outlet />
    </div>
  );
}
