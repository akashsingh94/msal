import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { MsalProvider, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import {
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

import "./App.css";
import { Routers } from "./Routers";

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      '"Poppins"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App({ msalInstance }) {
  // const { instance } = useMsal();
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    {}
  );

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      login(InteractionType.Redirect, request);
    }
  }, [error]);

  // useEffect(() => {
  //   (async () => {
  //     const isAuthenticated = !!instance && !!instance.getActiveAccount();
  //     if (isAuthenticated) return; // already authenticated
  //     try {
  //       await instance.ssoSilent({});
  //     } catch (err) {
  //       if (err instanceof InteractionRequiredAuthError) {
  //         await instance.loginRedirect();
  //       } else {
  //         console.log("Error during SSO: ", err);
  //       }
  //     }
  //   })();
  // }, [instance]);

  return (
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div className="App">
          <Routers />
        </div>
      </ThemeProvider>
    </MsalProvider>
  );
}

export default App;
