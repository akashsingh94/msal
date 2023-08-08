import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

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
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    (async () => {
      if (isAuthenticated) return; // already authenticated
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
  }, [instance, isAuthenticated]);

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
