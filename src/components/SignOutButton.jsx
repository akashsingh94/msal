import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { useCallback } from "react";

export function SignOutButton() {
  const { instance } = useMsal();

  const handleSignIn = useCallback(() => {
    instance.logoutRedirect();
  }, [instance]);

  return (
    <Button variant="outlined" onClick={handleSignIn} color="inherit">
      Sign In
    </Button>
  );
}
