import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import ThemeToggle from "../components/ThemeToggle";
import api from "../lib/api";
import "../css/form.css";
import ClosableAlert from "../components/ClosableAlert";

const LoginPage = () => {
  const [token, setToken] = createSignal("");
  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);
  const navigate = useNavigate();

  onMount(async () => {
    if (!localStorage.getItem("token")) return;

    try {
      const response = await api.verifyToken(localStorage.getItem("token"));
      if ("error" in response) {
        console.log("Token in localStorage is invalid, ignoring...");
      } else {
        alert("Account found, you have been logged in");
        navigate("/polls");
      }
    } catch (error) {}
  });

  const login = async () => {
    try {
      const response = await api.verifyToken(token());
      if ("error" in response) {
        if (response.status === 403) {
          setError(response.maybeJson?.message);
          return setAlertOpen(true);
        } else if (response.status === 400) {
          setError(response.maybeJson?.message);
          return setAlertOpen(true);
        } else {
          setError(response.maybeJson?.message || 'Something went wrong!');
          return setAlertOpen(true);
        }
      } else {
        localStorage.setItem("token", response.token);
        navigate("/polls");
      }
    } catch (error) {
      setError('There was an error!');
      return setAlertOpen(true);
    }
  };

  return (
    <div class="container">
      <div class="floating-box">
        <ThemeToggle />
        <h1 class="text-2xl">Login</h1>
        <ClosableAlert
          open={alertOpen()}
          severity="error"
          onClose={() => setAlertOpen(false)}
        >
          {error()}
        </ClosableAlert>
        <TextField
          label="Token"
          variant="filled"
          onInput={(e) => setToken(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
