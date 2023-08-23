import { useMsal } from "@azure/msal-react";
import { useEffect, useState } from "react";
import { InteractionStatus } from "@azure/msal-browser";

export function useAcquireTokenSilently() {
  const { instance, inProgress } = useMsal();
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (inProgress === InteractionStatus.None) {
        setLoading(true);
        const account = instance.getActiveAccount();
        if (!account) {
          console.log(
            "No active account! Verify a user has been signed in and setActiveAccount has been called."
          );
          setLoading(false);
          return;
        }
        const response = await instance.acquireTokenSilent({
          // ...loginRequest,
          account,
          scopes: [
            "https://stagewegmansonline.onmicrosoft.com/cert.api.digitaldevelopment.wegmans.cloud/Users.Profile.Read",
          ],
        });
        setToken(response.accessToken);
        setLoading(false);
      }
    })();
  }, [inProgress, instance]);
  return { loading, token };
}
