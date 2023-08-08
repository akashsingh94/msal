import { useMsal } from "@azure/msal-react";
import { Typography } from "@mui/material";

export function Welcome() {
  const { instance } = useMsal();
  // const [username, setUsername] = useState("");

  // useEffect(() => {
  //   // if (!isAuthenticated) return;
  //   const acc = instance.getActiveAccount();
  //   if (acc) setUsername(acc?.idTokenClaims?.given_name);
  // }, [instance, isAuthenticated]);
  let username = "";
  const acc = instance.getActiveAccount();
  if (acc) username = acc?.idTokenClaims?.given_name;

  if (!username) return null;
  return <Typography style={{ marginRight: 15 }}>Hello, {username}</Typography>;
}
