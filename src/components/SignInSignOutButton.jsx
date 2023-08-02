import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { InteractionStatus } from "@azure/msal-browser";
import { Button } from "@mui/material";

export function SignInSignOutButton() {
  const { inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return (
      <Button variant="outlined" color="inherit">
        Sign Out
      </Button>
    );
  } else if (
    inProgress !== InteractionStatus.Startup &&
    inProgress !== InteractionStatus.HandleRedirect
  ) {
    // inProgress check prevents sign-in button from being displayed briefly after returning from a redirect sign-in. Processing the server response takes a render cycle or two
    return <SignInButton />;
  } else {
    return null;
  }
}
