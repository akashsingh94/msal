import { useMsal } from "@azure/msal-react";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export function ChangePassword() {
  const [changePassword, setChangePassword] = useState(false);
  const { instance } = useMsal();

  const handleChangePassword = useCallback(() => {
    setChangePassword(true);
    instance.loginRedirect({
      authority:
        "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WegmansChangePassword",
    });
  }, [instance]);

  return (
    <div className="flex-center">
      <LoadingButton
        onClick={handleChangePassword}
        loading={changePassword}
        disabled={changePassword}
        variant="contained"
        color="primary"
      >
        Change Password
      </LoadingButton>
    </div>
  );
}
