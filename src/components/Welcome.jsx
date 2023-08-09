import { useMsal } from "@azure/msal-react";
import { Typography } from "@mui/material";

export function Welcome() {
  const { instance } = useMsal();
  let username = "";
  const acc = instance.getActiveAccount();
  if (acc) username = acc?.idTokenClaims?.given_name;

  if (!username) return null;
  return <Typography style={{ marginRight: 15 }}>Hello, {username}</Typography>;
}

//https://myaccount.wegmans.com/wegmansonline.onmicrosoft.com/oauth2/v2.0/authorize?client_id=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e&p=B2C_1A_WegmansEdit2StepAuthentication&state=B2C_1A_WegmansEdit2StepAuthentication&redirect_uri=https:%2f%2fshop.wegmans.com%2fredirect&response_type=code&scope=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e%20offline_access

//https://myaccount.wegmans.com/wegmansonline.onmicrosoft.com/oauth2/v2.0/authorize?client_id=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e&p=B2C_1A_WegmansProfileEdit&state=B2C_1A_WegmansProfileEdit&redirect_uri=https%3A%2F%2Fshop.wegmans.com%2Fredirect&response_type=code&scope=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e%20offline_access
