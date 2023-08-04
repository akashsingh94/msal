import { Fragment, useEffect, useState } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import { Card, CardContent, Typography } from "@mui/material";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { pca } from "../App";
import { Loading } from "./Loading";
import "./Profile.css";

// const loginRequest = {
//   scopes: ["User.Read"],
// };

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (!token && inProgress === InteractionStatus.None) {
        const account = pca.getActiveAccount();
        if (!account) {
          throw Error(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
          );
        }
        setLoading(true);
        const response = await pca.acquireTokenSilent({
          // ...loginRequest,
          account: account,
        });
        setToken(response.idToken);
        setLoading(false);
      }
    })();
  }, [inProgress, instance, token]);

  if (loading) return <Loading />;
  if (!token)
    return (
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        Unable to get — <strong>JWT token!</strong>
      </Alert>
    );
  var decoded = jwt_decode(token);
  if (!decoded)
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Unable to decode — <strong>JWT token!</strong>
      </Alert>
    );

  return (
    <div className="card-container">
      <Card className="card">
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Your profile
          </Typography>
          <dl className="data-list">
            {Object.keys(decoded).map((k) => (
              <Fragment key={k}>
                <dt className="data-title">{k}</dt>
                <dd>{decoded[k]}</dd>
              </Fragment>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
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
