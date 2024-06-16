import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import ClosableAlert from "../components/ClosableAlert";
import { Box, Container, CssBaseline } from "@suid/material";
import NoLoginAppBar from "../components/NoLoginAppBar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [discordId, setDiscordId] = createSignal("");
  const [password, setPassword] = createSignal("");
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
      const response = await api.login(password(), discordId());
      if ("error" in response) {
        if (response.status === 403) {
          setError(response.maybeJson?.error);
          return setAlertOpen(true);
        } else if (response.status === 400) {
          setError(response.maybeJson?.error);
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
      setError("There was an error!");
      return setAlertOpen(true);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          bgcolor: "box.box",
          width: "50vh",
          p: "20px",
          border: "1px solid box.box",
          borderRadius: "8px",
        }}
      >
        <NoLoginAppBar />
        <br />
        <h1 class="text-2xl">Login</h1>
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
        <Button variant="contained" color="primary" onClick={login}>
          Login
        </Button>
        <p class="mt-4">
          Don't have an account just yet?{" "}
          <Button color="secondary" onClick={() => navigate("/register")}>
            Register here
          </Button>
        </p>
      </Box>
      <Footer sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
};

export default LoginPage;
