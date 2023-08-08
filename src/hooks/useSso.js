import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { useEffect } from "react";
import {
  InteractionType,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";

export function useSso() {
  const { instance } = useMsal();
  const { login, result, error } = useMsalAuthentication(
    InteractionType.Silent,
    {}
  );

  useEffect(() => {
    if (result) instance.setActiveAccount(result);
  }, [instance, result]);

  useEffect(() => {
    if (error instanceof InteractionRequiredAuthError) {
      login(InteractionType.Redirect, {});
    }
  }, [error, login]);
}
