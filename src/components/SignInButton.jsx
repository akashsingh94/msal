import { useMsal } from "@azure/msal-react";
import { Button } from "@mui/material";
import { useCallback } from "react";

export function SignInButton() {
  const { instance } = useMsal();

  const handleSignIn = useCallback(() => {
    instance.loginRedirect();
  }, [instance]);

  return (
    <Button variant="outlined" onClick={handleSignIn} color="inherit">
      Sign In
    </Button>
  );
}
