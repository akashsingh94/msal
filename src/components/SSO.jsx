import { useMsal } from "@azure/msal-react";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export function SSO() {
  const [loading, setLoading] = useState(false);

  const { instance } = useMsal();

  const handleSso = useCallback(() => {
    setLoading(true);
    instance.loginRedirect({
      redirectUri: "https://heimdall.remscripts.com/",
    });
  }, [instance]);

  return (
    <div className="flex-center">
      <LoadingButton
        // onClick={handleSso}
        loading={loading}
        disabled={loading}
        variant="contained"
        color="primary"
        sx={{ width: "max-content" }}
        component="a"
        href="https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_WegmansSignupSigninWithPhoneVerification&client_id=61fed126-4345-410b-941d-768396d1758d&nonce=defaultNonce&state=eyJzb3VyY2UiOiJXQiIsICJzdGF0ZSIgOiJsb2dpbiJ9&redirect_uri=https://heimdall.remscripts.com/wg/login&scope=61fed126-4345-410b-941d-768396d1758d%20openid&response_type=code
        "
      >
        Pharmacy SSO
      </LoadingButton>
      <LoadingButton
        // onClick={handleSso}
        loading={loading}
        disabled={loading}
        variant="contained"
        color="primary"
        sx={{ width: "max-content" }}
        component="a"
        href="https://meals2gocerteastus.z13.web.core.windows.net/"
      >
        meals2go
      </LoadingButton>
    </div>
  );
}
