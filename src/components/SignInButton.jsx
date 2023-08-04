import { useMsal } from "@azure/msal-react";
import { LoadingButton } from "@mui/lab";
import { useCallback, useState } from "react";

export function SignInButton() {
  const { instance } = useMsal();
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = useCallback(() => {
    setSigningIn(true);
    instance.loginRedirect();
  }, [instance]);

  return (
    <LoadingButton
      loading={signingIn}
      disabled={signingIn}
      variant="outlined"
      onClick={handleSignIn}
      color="inherit"
    >
      Sign In
    </LoadingButton>
  );
}
