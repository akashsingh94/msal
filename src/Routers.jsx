import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Typography } from "@mui/material";

import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { Profile } from "./components/Profile";
import { SSO } from "./components/SSO";
import { ChangePassword } from "./components/ChangePassword";
import { AccountSecurity } from "./components/AccountSecurity";
import { Addresses } from "./components/Addresses";
import { JwtToken } from "./components/JwtToken";
import { GoogleMaps } from "./components/AddressAutocomplete";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sso" element={<SSO />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="account-security" element={<AccountSecurity />} />
          <Route path="delivery-addresses" element={<Addresses />} />
          <Route path="jwt-token" element={<JwtToken />} />
          <Route path="add-address" element={<GoogleMaps />} />
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
