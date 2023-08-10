import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Typography } from "@mui/material";
import { Welcome } from "./Welcome";

export function Home() {
  return (
    <div className="flex-center">
      <AuthenticatedTemplate>
        <Welcome />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>Please sign-in to see your profile information.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </div>
  );
}
