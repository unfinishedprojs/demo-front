import {
  AppBar as AppBarSuid,
  Button,
  Toolbar,
  Typography,
} from "@suid/material";
import ThemeToggle from "./ThemeToggle";

const NoLoginAppBar = () => {
  return (
    <AppBarSuid sx={{ bgcolor: "box.box" }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Demo-Infra
        </Typography>
        <Button variant="text" class="!text-text" href="/login">
          Login
        </Button>
        <Button variant="text" class="!text-text" href="/register">
          Register
        </Button>
        <ThemeToggle />
      </Toolbar>
    </AppBarSuid>
  );
};

export default NoLoginAppBar;
