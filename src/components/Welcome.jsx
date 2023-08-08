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
