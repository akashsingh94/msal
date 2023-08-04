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

//https://myaccount.wegmans.com/wegmansonline.onmicrosoft.com/b2c_1a_wegmanssignupsigninwithphoneverification/oauth2/v2.0/authorize?client_id=d35cf2c4-8982-445f-9274-6c9d6ccb22b5&scope=https%3A%2F%2Fwegmansonline.onmicrosoft.com%2Fmeals2go%2Fuser_impersonation%20openid%20profile%20offline_access&redirect_uri=https%3A%2F%2Fmeals2go.com%2F&client-request-id=358e798a-6dc0-48f4-8750-bef8c28297cb&response_mode=fragment&response_type=code&x-client-SKU=msal.js.browser&x-client-VER=2.34.0&client_info=1&code_challenge=0bsqU6bPtTS7XP-kNmY1ujPQpu2KlS2B8H6ikeNHh5Y&code_challenge_method=S256&nonce=ad791da6-4258-4ba9-9df6-8b843c770445&state=eyJpZCI6ImQ2NmU4MDU2LWIzMTUtNDA4ZC05ODEwLTRjYmJhOWIzOWY5NiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicmVkaXJlY3QifX0%3D%7C%7B%22stateData%22%3A%7B%22cs-cart-id%22%3Anull%7D%7D

export function Home() {
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const { instance } = useMsal();

  const handleSso = useCallback(() => {
    setLoading(true);
    instance.loginRedirect({
      authority:
        "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WegmansSignupSigninWithPhoneVerification",
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
