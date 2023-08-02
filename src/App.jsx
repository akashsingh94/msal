import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const pca = new PublicClientApplication({
  auth: {
    clientId: "416b8c3a-1fc8-459d-b40f-7e5d9d6dd80f",
    authority:
      "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WEGMANSSIGNUPSIGNINWITHPHONEVERIFICATION",
    redirectUri: "https://introspecttestwebpoc.azurewebsites.net/",
    knownAuthorities: ["stagingmyaccount.wegmans.com"],
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MsalProvider instance={pca}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="profile" element={<Profile />} />

                <Route path="*" element={<p>404 | Not Found</p>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </MsalProvider>
    </ThemeProvider>
  );
}

export default App;