import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { Typography } from "@mui/material";
import { SSO } from "./components/SSO";
import { ChangePassword } from "./components/ChangePassword";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sso" element={<SSO />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route
            path="*"
            element={
              <Typography variant="h4" component="p">
                404 | Not Found
              </Typography>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
