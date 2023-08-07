import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { SignInSignOutButton } from "./SignInSignOutButton";
import { Welcome } from "./Welcome";

export function AppHeader() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
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
            Auth POC
          </Typography>
          <Welcome />
          <SignInSignOutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
