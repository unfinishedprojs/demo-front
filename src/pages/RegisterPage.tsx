import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import ThemeToggle from "../components/ThemeToggle";
import api from "../lib/api";
import "../css/form.css";
import ClosableAlert from "../components/ClosableAlert";

const RegisterPage = () => {
  const [discordId, setDiscordId] = createSignal("");
  const [inviteCode, setInviteCode] = createSignal("");
  const [error, setError] = createSignal('');
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

  const register = async () => {
    try {
      const response = await api.register(inviteCode(), discordId());
      if ("error" in response) {
        if (response.status === 403) {
          setError(response.maybeJson?.message);
          return setAlertOpen(true);
        } else if (response.status === 409) {
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
      alert("Registration failed!");
    }
  };

  return (
    <div class="container">
      <div class="floating-box">
        <ThemeToggle />
        <h1 class="text-2xl">Register</h1>
        <ClosableAlert open={alertOpen()} severity="error" onClose={() => setAlertOpen(false)}>
          {error()}
        </ClosableAlert>
        <TextField
          label="Discord ID"
          variant="filled"
          onInput={(e) => setDiscordId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Invite Code"
          variant="filled"
          onInput={(e) => setInviteCode(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={register}>
          Register
        </Button>
        <p class="mt-4">
          Already have an account?{" "}
          <Button color="secondary" onClick={() => navigate("/login")}>
            Login here
          </Button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
