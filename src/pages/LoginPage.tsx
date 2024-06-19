import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import ClosableAlert from "../components/ClosableAlert";
import { Box, Container, CssBaseline, useMediaQuery } from "@suid/material";
import NoLoginAppBar from "../components/NoLoginAppBar";
import { MOBILE_MEDIA_QUERY } from "../utils/mobileMediaQuery";
import { Center } from "../components/Center";
import { getToken } from "../utils/getToken";

const LoginPage = () => {
  const [discordId, setDiscordId] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);
  const navigate = useNavigate();
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  onMount(async () => {
    if (!getToken()) return;

    try {
      const response = await api.verifyToken();
      if ("error" in response) {
        console.log("Token in localStorage is invalid, ignoring...");
      } else {
        alert("Account found, you have been logged in");
        localStorage.setItem("discordUser", response.discordUser);
        localStorage.setItem("discordSlug", response.discordSlug);
        localStorage.setItem("discordPfpUrl", response.discordPfpUrl);
        localStorage.setItem("admin", response.admin);
        navigate("/polls");
      }
    } catch (error) {}
  });

  const login = async () => {
    try {
      const response = await api.login(password(), discordId());
      if ("error" in response) {
        switch (response.status) {
          case 409:
          case 400:
            setError(response.maybeJson?.error);
            break;
          default:
            setError(
              response.maybeJson
                ? response.maybeJson.error
                : "Something went wrong!",
            );
            break;
        }

        return setAlertOpen(true);
      }

      console.log(response);
      localStorage.setItem("discordUser", response.discordUser);
      localStorage.setItem("discordSlug", response.discordSlug);
      localStorage.setItem("discordPfpUrl", response.discordPfpUrl);
      localStorage.setItem("admin", response.admin);
      localStorage.setItem("token", response.token);
      navigate("/polls");
    } catch (error) {
      setError("There was an error!");
      return setAlertOpen(true);
    }
  };

  return (
    <Center>
      <Box
        class="w-[90%] rounded-md p-4 md:w-[40vw]"
        sx={{
          bgcolor: "box.box",
          border: "1px solid box.box",
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
        <p class="mt-4">Don't have an account just yet?</p>
        <Button
          sx={{ padding: 0 }}
          color="secondary"
          onClick={() => navigate("/register")}
        >
          Register here
        </Button>
      </Box>
    </Center>
  );
};

export default LoginPage;
