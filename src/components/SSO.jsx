import { useMsal } from "@azure/msal-react";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAcquireTokenSilently } from "../hooks/useAcquireTokenSilently";

export function SSO() {
  const [loading, setLoading] = useState(false);

  const { instance } = useMsal();
  const { token } = useAcquireTokenSilently();
  console.log(token);
  const handleSso = useCallback(() => {
    setLoading(true);
    instance.loginRedirect({
      redirectUri: "https://introspecttestwebpoc.azurewebsites.net/",
    });
  }, [instance]);

  return (
    <div className="flex-center">
      <LoadingButton
        onClick={handleSso}
        loading={loading}
        disabled={loading}
        variant="contained"
        color="primary"
        sx={{ width: "max-content" }}
      >
        Test SSO
      </LoadingButton>
    </div>
  );
}
