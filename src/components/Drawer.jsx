import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

const drawerWidth = 240;

const drawerItems = [
  { name: "View Profile", href: "/profile" },
  { name: "SSO", href: "/sso" },
  { name: "Change Password", href: "/change-password" },
  { name: "Account Security", href: "/account-security" },
];

export function Drawer() {
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) return null;

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {drawerItems.map((i) => (
            <ListItem key={i.name} disablePadding>
              <ListItemButton
                component={Link} // <-- pass Link as component
                to={i.href}
              >
                <ListItemText primary={i.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </MuiDrawer>
  );
}
