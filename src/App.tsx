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
import { createEffect, createMemo, createSignal } from "solid-js";

const cssVar = (name: string) =>
  getComputedStyle(document.body).getPropertyValue(name).trim();

function App() {
  const palette = createMemo(() => {
    return createPalette({
      mode: themeGeneral(),
      box: {
        main: cssVar("--body-background-color"),
        box: cssVar("--box-background-color"),
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
        <Route path="/polls" component={PollsPage} />
        <Route path="/ended" component={EndedPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/vote/:id" component={VotePage} />
        <Route path="/suggest" component={SuggestUserPage} />
        <Route path="/rules" component={RulesPage} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
