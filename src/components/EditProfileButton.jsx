//https://myaccount.wegmans.com/wegmansonline.onmicrosoft.com/oauth2/v2.0/authorize?client_id=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e&p=B2C_1A_WegmansProfileEdit&state=B2C_1A_WegmansProfileEdit&redirect_uri=https%3A%2F%2Fshop.wegmans.com%2Fredirect&response_type=code&scope=7c0edc2c-5aa9-4a85-9ab0-ae11c5bb251e%20offline_access

import { useMsal } from "@azure/msal-react";
import { useCallback, useState } from "react";
import { LoadingButton } from "@mui/lab";

export function EditProfileButton() {
  const [editing, setEditing] = useState(false);
  const { instance } = useMsal();

  const handleEditProfile = useCallback(() => {
    setEditing(true);
    instance.loginRedirect({
      authority:
        "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WegmansProfileEdit",
    });
  }, [instance]);

  return (
    <div className="flex-center">
      <LoadingButton
        onClick={handleEditProfile}
        loading={editing}
        disabled={editing}
        variant="contained"
        color="primary"
      >
        Edit Profile
      </LoadingButton>
    </div>
  );
}
