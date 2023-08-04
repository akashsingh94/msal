import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import "./Home.css";
import { sso } from "../App";
import { LoadingButton } from "@mui/lab";
import { useCallback, useState } from "react";

export function Home() {
  const [loading, setLoading] = useState(false);
  const handleSso = useCallback(() => {
    setLoading(true);
    sso.loginRedirect();
  }, []);

  return (
    <div className="app-home">
      <AuthenticatedTemplate>
        <Button
          component={RouterLink}
          to="/profile"
          variant="contained"
          color="primary"
        >
          Request Profile Information
        </Button>
        <LoadingButton
          onClick={handleSso}
          loading={loading}
          disabled={loading}
          variant="contained"
          color="primary"
        >
          Test SSO
        </LoadingButton>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>Please sign-in to see your profile information.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </div>
  );
}
