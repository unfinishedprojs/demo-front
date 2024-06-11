import { Route, Router } from "@solidjs/router";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import PollsPage from "./pages/PollsPage";
import VotePage from "./pages/VotePage";

function App() {
  return (
    <Router>
      <Route path="/" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/polls" component={PollsPage} />
      <Route path="/vote/:id" component={VotePage} />
    </Router>
  );
}

export default App;
