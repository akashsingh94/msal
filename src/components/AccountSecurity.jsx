import { useMsal } from "@azure/msal-react";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export function AccountSecurity() {
  const [loading, setLoading] = useState(false);

  const { instance } = useMsal();

  const handleSso = useCallback(() => {
    setLoading(true);
    instance.loginRedirect({
      authority:
        "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WegmansEdit2StepAuthentication",
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
        Account Security
      </LoadingButton>
    </div>
  );
}
