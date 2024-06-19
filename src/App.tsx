import { HashRouter as Router, Route } from "@solidjs/router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PollsPage from "./pages/PollsPage";
import VotePage from "./pages/VotePage";
import SuggestUserPage from "./pages/SuggestUserPage";
import {
  ThemeProvider,
  createPalette,
  createTheme,
  type Theme,
} from "@suid/material";
import { theme as themeGeneral } from "./components/ThemeToggle";
import EndedPage from "./pages/EndedPage";
import RulesPage from "./pages/RulesPage";
import { Layout } from "./Layout";
import { createMemo } from "solid-js";
import CustomizeUserPage from "./pages/CustomizeUserPage";
import RG from "./RouterGuard";
import { themes } from "./constants";

const cssVar = (name: string) => {
  return getComputedStyle(document.body).getPropertyValue(name).trim();
};

function App() {
  const palette = createMemo(() => {
    return createPalette({
      mode: themes.find((t) => t.value === themeGeneral())!.dark
        ? "dark"
        : "light",
      background: {
        default: cssVar("--base"),
        paper: cssVar("--box"),
      },
      text: {
        primary: cssVar("--text"),
        secondary: cssVar("--subtext"),
      },
      primary: {
        contrastText: cssVar("--text"),
        main: cssVar("--accent"),
        dark: cssVar("-accent-dark"),
        light: cssVar("--accent-light"),
      },
      error: {
        contrastText: cssVar("--text"),
        main: cssVar("--error"),
        dark: cssVar("-error-dark"),
        light: cssVar("--error-light"),
      },
      warning: {
        contrastText: cssVar("--text"),
        main: cssVar("--warning"),
        dark: cssVar("-warning-dark"),
        light: cssVar("--warning-light"),
      },
      info: {
        contrastText: cssVar("--text"),
        main: cssVar("--info"),
        dark: cssVar("-info-dark"),
        light: cssVar("--info-light"),
      },
      success: {
        contrastText: cssVar("--text"),
        main: cssVar("--success"),
        dark: cssVar("-success-dark"),
        light: cssVar("--success-light"),
      },
      box: {
        main: cssVar("--base"),
        box: cssVar("--box"),
        border: cssVar("--border-color"),
        text: cssVar("--text"),
      },
    });
  });

  const theme = createTheme({ palette });

  return (
    <ThemeProvider theme={theme}>
      <Router root={Layout}>
        <Route path="/" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />

        <Route path="/polls" component={() => <RG children={PollsPage} />} />
        <Route path="/ended" component={() => <RG children={EndedPage} />} />

        <Route path="/register" component={RegisterPage} />
        <Route path="/vote/:id" component={() => <RG children={VotePage} />} />
        <Route
          path="/suggest"
          component={() => <RG children={SuggestUserPage} />}
        />
        <Route path="/rules" component={RulesPage} />
        <Route
          path="/role"
          component={() => <RG children={CustomizeUserPage} />}
        />
      </Router>
    </ThemeProvider>
  );
}

export default App;
