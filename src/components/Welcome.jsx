import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

export function Welcome() {
  const isAuthenticated = useIsAuthenticated();
  const { instance } = useMsal();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;
    const acc = instance.getActiveAccount();
    if (acc) setUsername(acc?.idTokenClaims?.given_name);
  }, [instance, isAuthenticated]);

  if (!isAuthenticated) return null;
  return <Typography style={{ marginRight: 15 }}>Hello, {username}</Typography>;
}
