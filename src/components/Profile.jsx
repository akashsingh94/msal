import { useEffect, useRef, useState } from "react";
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType } from "@azure/msal-browser";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { Loading } from "./Loading";
import "./Profile.css";
import { ProfileCard } from "./ProfileCard";
import { pca } from "../index";

// const loginRequest = {
//   scopes: ["User.Read"],
// };

const ProfileContent = () => {
  const { instance, inProgress } = useMsal();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const account = useRef(pca.getActiveAccount());

  console.log(account.current);

  useEffect(() => {
    (async () => {
      if (!token && inProgress === InteractionStatus.None) {
        if (!account.current) {
          throw Error(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
          );
        }
        setLoading(true);
        const response = await pca.acquireTokenSilent({
          // ...loginRequest,
          account: account.current,
        });
        setToken(response.idToken);
        setLoading(false);
      }
    })();
  }, [account, inProgress, instance, token]);

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
  const contactInfo = {
    "First name": decoded.given_name,
    "Last name": decoded.family_name,
    Email: decoded.email,
    "Shopper Club Number": "103227399",
  };
  const contactaddress = {
    "First name": decoded.given_name,
    "Last name": decoded.family_name,
    Adress: "21 Wesmont Drive",
    "Apartment Number": "dummy 112",
    "PO Box": "Test",
    City: "Wood Ridge",
    State: "NJ",
    "Zip code": "07075",
  };
  return (
    <div>
      <ProfileCard title="Contact Information" data={contactInfo} />
      <ProfileCard title="Contact Address" data={contactaddress} />
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
