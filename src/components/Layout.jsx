import React, { useEffect } from "react";
import { Outlet } from "react-router";

import { AppHeader } from "./AppHeader";
import "./Layout.css";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

//https://myaccount.wegmans.com/wegmansonline.onmicrosoft.com/b2c_1a_wegmanssignupsigninwithphoneverification/v2.0/.well-known/openid-configuration

export function Layout() {
  const { instance } = useMsal();

  useEffect(() => {
    (async () => {
      try {
        await instance.ssoSilent({});
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          await instance.loginRedirect();
        } else {
          console.log("Error during SSO: ", err);
        }
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
