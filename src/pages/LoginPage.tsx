import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import "../css/form.css";
import ClosableAlert from "../components/ClosableAlert";
import { Box, Container } from "@suid/material";
import NoLoginAppBar from "../components/NoLoginAppBar";

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
          setError(response.maybeJson ? response.maybeJson.error : "Something went wrong!");
          return setAlertOpen(true);
        }
      } else {
        localStorage.setItem("token", response.token);
        navigate("/polls");
      }
    } catch (error) {
      setError("There was an error!");
      return setAlertOpen(true);
    }
  };

  return (
    // <Layout>
      <Container maxWidth="sm">
        <Box
          sx={{
            bgcolor: "box.box",
            width: "50vh",
            p: '20px',
            border: '1px solid box.box',
            borderRadius: '8px'
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
            label="Token"
            variant="filled"
            onInput={(e) => setToken((e.target as HTMLInputElement).value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={login}>
            Login
          </Button>
        </Box>
      </Container>
    // </Layout>
  );
};

export default LoginPage;
