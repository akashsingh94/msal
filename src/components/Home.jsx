import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { Button, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

import "./Home.css";

export function Home() {
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { instance } = useMsal();

  //https://myaccount.wegmans.com/wegmansonline.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_WegmansChangePassword&state=B2C_1A_WegmansChangePassword&client_id=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fshop.wegmans.com%2Fsocial-redirect%2Fwegmans_idp&scope=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e%20openid%20offline_access&response_type=code

  const handleSso = useCallback(() => {
    setLoading(true);
    instance.loginRedirect({
      redirectUri: "https://introspecttestwebpoc.azurewebsites.net/",
    });
  }, [instance]);

  const handleChangePassword = useCallback(() => {
    setChangePassword(true);
    instance.loginRedirect({
      authority:
        "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WegmansChangePassword",
    });
  }, [instance]);

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
        <LoadingButton
          onClick={handleChangePassword}
          loading={changePassword}
          disabled={changePassword}
          variant="contained"
          color="primary"
        >
          Change Password
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
