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
