import { Card, CardContent, Typography } from "@mui/material";
import { Fragment } from "react";

import "./ProfileCard.css";

export function ProfileCard(props) {
  const { data, title } = props;
  return (
    <div className="component--user-profile-data">
      <Card elevation={0} sx={{ minWidth: "50%" }}>
        <CardContent>
          <div className="user-profile-card-title-wrapper tw--mb-9">
            <Typography
              className="user-profile-card-title"
              variant="h4"
              component="h2"
            >
              {title}
            </Typography>
          </div>
          <dl className="user-profile-data">
            {Object.keys(data).map((k) => (
              <Fragment key={k}>
                <dt className="user-profile-data-title">{k}</dt>
                <dd className="user-profile-data-description">{data[k]}</dd>
              </Fragment>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
