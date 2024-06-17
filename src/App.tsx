import { HashRouter as Router, Route } from "@solidjs/router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PollsPage from "./pages/PollsPage";
import VotePage from "./pages/VotePage";
import SuggestUserPage from "./pages/SuggestUserPage";
import { ThemeProvider, createTheme, type Theme } from "@suid/material";
import { theme as themeGeneral } from "./components/ThemeToggle";
import EndedPage from "./pages/EndedPage";
import RulesPage from "./pages/RulesPage";

function App() {
  let theme: Theme<string>;

  if (themeGeneral() === "dark") {
    theme = createTheme({
      palette: {
        mode: "dark",
        box: {
          main: "#222222",
          box: "#333",
          border: "#444",
          text: "#fff",
        },
      },
    });
  } else {
    theme = createTheme({
      palette: {
        mode: "light",
        box: {
          main: "#ffffff",
          box: "#f0f0f0",
          border: "#ccc",
          text: "#000",
        },
      },
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
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
