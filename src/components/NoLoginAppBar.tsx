import {
  AppBar as AppBarSuid,
  Button,
  Toolbar,
  Typography,
} from "@suid/material";
import ThemeToggle from "./ThemeToggle";

const NoLoginAppBar = () => {
  return (
    <AppBarSuid>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Demo-Infra
        </Typography>
        <Button variant="text" href="/login">
          Login
        </Button>
        <Button variant="text" href="/register">
          Register
        </Button>
        <ThemeToggle />
      </Toolbar>
    </AppBarSuid>
  );
};

export default NoLoginAppBar;
