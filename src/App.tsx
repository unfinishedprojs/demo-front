import { Route, Router } from "@solidjs/router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PollsPage from "./pages/PollsPage";
import VotePage from "./pages/VotePage";
import SuggestUserPage from "./pages/SuggestUserPage";
import { ThemeProvider, createTheme } from "@suid/material";
import { theme } from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider theme={createTheme({
      palette: {
        mode: theme() as 'dark' | 'light',
      },
    })}>
      <Router>
        <Route path="/" component={RegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/polls" component={PollsPage} />
        <Route path="/vote/:id" component={VotePage} />
        <Route path="/suggest" component={SuggestUserPage} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
