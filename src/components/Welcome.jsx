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
    if (acc) setUsername(acc.username);
  }, [instance, isAuthenticated]);

  if (!isAuthenticated) return null;
  return (
    <Typography style={{ marginRight: 15 }}>Welcome, {username}</Typography>
  );
}
