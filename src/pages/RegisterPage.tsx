import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import "../css/form.css";
import ClosableAlert from "../components/ClosableAlert";
import NoLoginAppBar from "../components/NoLoginAppBar";
import { Container, Box } from "@suid/material";

const RegisterPage = () => {
  const [discordId, setDiscordId] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [inviteCode, setInviteCode] = createSignal("");
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

  const register = async () => {
    try {
      const response = await api.register(
        inviteCode(),
        discordId(),
        password()
      );
      if ("error" in response) {
        if (response.status === 403) {
          setError(response.maybeJson?.message);
          return setAlertOpen(true);
        } else if (response.status === 409) {
          setError(response.maybeJson?.message);
          return setAlertOpen(true);
        } else {
          setError(
            response.maybeJson
              ? response.maybeJson.error
              : "Something went wrong!"
          );
          return setAlertOpen(true);
        }
      } else {
        console.log(response);
        localStorage.setItem("token", response.token);
        localStorage.setItem("discordUser", response.discordUser);
        localStorage.setItem("discordSlug", response.discordSlug);
        localStorage.setItem("discordPfpUrl", response.discordPfpUrl);
        navigate("/polls");
      }
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "box.box",
          p: "20px",
          border: "1px solid box.box",
          borderRadius: "8px",
        }}
      >
        <NoLoginAppBar />
        <h1 class="text-2xl">Register</h1>
        <ClosableAlert
          open={alertOpen()}
          severity="error"
          onClose={() => setAlertOpen(false)}
        >
          {error()}
        </ClosableAlert>
        <TextField
          required
          label="Discord ID"
          variant="filled"
          onInput={(e) => setDiscordId((e.target as HTMLInputElement).value)}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          type="password"
          label="Password"
          variant="filled"
          onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          fullWidth
          margin="normal"
        />
        <TextField
          required
          label="Invite Code"
          variant="filled"
          onInput={(e: Event) =>
            setInviteCode((e.target as HTMLInputElement).value)
          }
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
      </Box>
    </Container>
  );
};

export default RegisterPage;
