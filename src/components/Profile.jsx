import { useEffect, useState } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";

import { pca } from "../App";
import { Loading } from "./Loading";
import { Card, CardContent, Typography } from "@mui/material";

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
          // ...loginRequest,
          account: account,
        });
        setToken(response.idToken);
      }
    })();
  }, [inProgress, instance, token]);

  return (
    <Card sx={{ maxWidth: "80%" }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Your token is:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {token}
        </Typography>
      </CardContent>
    </Card>
  );
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
