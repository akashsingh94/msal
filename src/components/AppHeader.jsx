import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SignInSignOutButton } from "./SignInSignOutButton";
import { Welcome } from "./Welcome";

export function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1, zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h6"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
            noWrap
            component="a"
            href="/"
          >
            <img
              src="https://shop.wegmans.com/images/header-logo.f92b8dc9.svg"
              alt="go to Wegmans home"
            />
          </Typography>
          <Welcome />
          <SignInSignOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
