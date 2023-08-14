import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Card, CardContent, Typography } from "@mui/material";

import { useAcquireTokenSilently } from "../hooks/useAcquireTokenSilently";
import { Loading } from "./Loading";

export function JwtToken() {
  const { loading, token } = useAcquireTokenSilently();
  if (loading) return <Loading />;
  return (
    <div>
      <Typography variant="h3">Jwt Token</Typography>
      <AuthenticatedTemplate>
        <div>
          <Card sx={{ minWidth: "50%", m: 2 }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="body1">{token}</Typography>
            </CardContent>
          </Card>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>Please sign-in to see your token.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </div>
  );
}
