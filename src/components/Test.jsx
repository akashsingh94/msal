import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Card, CardContent, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { useAcquireTokenSilently } from "../hooks/useAcquireTokenSilently";
import { Loading } from "./Loading";
import "./Test.css";

const data = [
  {
    name: "Address",
    field: "streetName",
  },
  {
    name: "Apartment Number",
    field: "apartment",
  },
  {
    name: "City",
    field: "city",
  },
  {
    name: "State",
    field: "state",
  },
  {
    name: "Zip code",
    field: "postalCode",
  },
];

export function Test() {
  const [loadingData, setLoadingData] = useState(false);
  const [apiData, setApiData] = useState([]);

  const { loading, token } = useAcquireTokenSilently();

  useEffect(() => {
    if (!token || !!apiData.length) return;
    setLoadingData(true);
    fetch("/oauth/token/getaddress", {
      headers: { Authentication: `Bearer ${token}` },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setApiData(data.addresses);
        setLoadingData(false);
      });
  }, [apiData, token]);

  if (loading || loadingData) return <Loading />;

  return (
    <div>
      <Typography variant="h3">Addresses</Typography>

      <AuthenticatedTemplate>
        {apiData.map((address) => {
          return (
            <Card key={address.id} sx={{ minWidth: "50%", m: 2 }}>
              <CardContent>
                <dl className="address-data">
                  {data.map((k) => {
                    return (
                      <Fragment key={address.id}>
                        <dt className="address-data-title">{k.name}</dt>
                        <dd className="address-data-description">
                          {address[k.field]}
                        </dd>
                      </Fragment>
                    );
                  })}
                </dl>
              </CardContent>
            </Card>
          );
        })}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Typography variant="h6">
          <center>Please sign-in to see your address.</center>
        </Typography>
      </UnauthenticatedTemplate>
    </div>
  );
}
