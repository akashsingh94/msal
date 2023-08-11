import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import jwt_decode from "jwt-decode";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

import { Loading } from "./Loading";
import { ProfileCard } from "./ProfileCard";
import "./Profile.css";
import { Typography } from "@mui/material";
import { EditProfileButton } from "./EditProfileButton";
import { useAcquireTokenSilently } from "../hooks/useAcquireTokenSilently";

// const loginRequest = {
//   scopes: ["User.Read"],
// };

const ProfileContent = () => {
  const { loading, token } = useAcquireTokenSilently();

  if (loading) return <Loading />;
  if (!token) return null;
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
      <EditProfileButton />
    </div>
  );
};

export function Profile() {
  return (
    <>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>Please sign-in to see your profile information.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </>
  );
}
