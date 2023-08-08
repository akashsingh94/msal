import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { useEffect } from "react";
import {
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

import { Routers } from "./Routers";
import "./App.css";

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

function App() {
  const { instance } = useMsal();
  // const inProgress = useRef(false);
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    {}
  );
  useEffect(() => {
    if (result) instance.setActiveAccount(result);
  }, [instance, result]);

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      login(InteractionType.Redirect, {});
    }
  }, [error, login]);

  // useEffect(() => {
  //   (async () => {
  //     debugger;
  //     const isAuthenticated = !!instance && !!instance.getActiveAccount();
  //     if (isAuthenticated || inProgress.current) return; // already authenticated
  //     inProgress.current = true;
  //     try {
  //       await instance.ssoSilent({});
  //     } catch (err) {
  //       if (err instanceof InteractionRequiredAuthError) {
  //         await instance.loginRedirect();
  //       } else {
  //         console.log("Error during SSO: ", err);
  //       }
  //     } finally {
  //       inProgress.current = false;
  //     }
  //   })();
  // }, [instance]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Routers />
      </div>
    </ThemeProvider>
  );
}

export default App;
