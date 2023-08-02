import { useEffect, useState } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import Paper from "@mui/material/Paper";

import { pca } from "../App";
import { Loading } from "./Loading";

// const loginRequest = {
//   scopes: ["User.Read"],
// };

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      if (!token && inProgress === InteractionStatus.None) {
        const account = pca.getActiveAccount();
        if (!account) {
          throw Error(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
          );
        }
        const response = await pca.acquireTokenSilent({
          //   ...loginRequest,
          account: account,
        });
        setToken(response.accessToken);
      }
    })();
  }, [inProgress, instance, token]);

  return <Paper>{token}</Paper>;
};

export function Profile() {
  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      loadingComponent={Loading}
    >
      <ProfileContent />
    </MsalAuthenticationTemplate>
  );
}
