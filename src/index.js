import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

export const pca = new PublicClientApplication({
  auth: {
    clientId: "416b8c3a-1fc8-459d-b40f-7e5d9d6dd80f",
    authority:
      "https://stagingmyaccount.wegmans.com/stagewegmansonline.onmicrosoft.com/B2C_1A_WEGMANSSIGNUPSIGNINWITHPHONEVERIFICATION",
    redirectUri: "http://localhost:3000",
    knownAuthorities: ["stagingmyaccount.wegmans.com"],
  },
  cache: {
    cacheLocation: "localStorage",
  },
});

if (!pca.getActiveAccount() && pca.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.
  pca.setActiveAccount(pca.getActiveAccount()[0]);
}

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS) {
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MsalProvider instance={pca}>
      <App />
    </MsalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
