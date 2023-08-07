import React, { useEffect } from "react";
import { Outlet } from "react-router";

import { AppHeader } from "./AppHeader";
import "./Layout.css";
import { useMsal } from "@azure/msal-react";

export function Layout() {
  const { instance } = useMsal();

  useEffect(() => {
    (async () => {
      try {
        await instance.ssoSilent({});
      } catch (err) {
        // if (err instanceof InteractionRequiredAuthError) {
        //   await instance.loginRedirect();
        // } else {
        //   console.log("Error during SSO: ", err);
        // }
        console.log("Error during SSO: ", err);
      }
    })();
  }, [instance]);

  return (
    <div className="app-layout">
      <AppHeader />
      <Outlet />
    </div>
  );
}
