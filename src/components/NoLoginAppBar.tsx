import { AppBar as AppBarSuid, Toolbar, Typography } from "@suid/material";
import ThemeToggle from "./ThemeToggle";
import { version } from "../../package.json";
import { createSignal, onMount } from "solid-js";
import api from "../lib/api";

const NoLoginAppBar = () => {
  return (
    <AppBarSuid>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Demo-Infra
        </Typography>
        <ThemeToggle />
      </Toolbar>
    </AppBarSuid>
  );
};

export default NoLoginAppBar;
