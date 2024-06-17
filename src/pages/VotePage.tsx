import { Show, createSignal, onMount } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import Button from "@suid/material/Button";
import api from "../lib/api";
import type {
  APIIVotePosResponse,
  APIIVoteNegResponse,
  APIFetchError,
} from "../lib/types";
import "../css/form.css";
import {
  Alert,
  Avatar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@suid/material";
import AppBar from "../components/AppBar";
import ClosableAlert from "../components/ClosableAlert";
import Footer from "../components/Footer";

const VotePage = () => {
  const params = useParams();
  const [poll, setPoll] = createSignal(null);

  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);
  const navigate = useNavigate();

  onMount(async () => {
    try {
      const response = await api.getInviteEvent(
        localStorage.getItem("token"),
        params.id
      );
      if ("error" in response) {
        setError(
          response.maybeJson
            ? response.maybeJson.error
            : "Something went wrong!"
        );
        return setAlertOpen(true);
      } else {
        console.log(response);
        setPoll(response);
      }
    } catch (error) {
      alert("Failed to fetch poll!");
    }
  });

  const vote = async (option) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      let response:
        | APIIVotePosResponse
        | APIIVoteNegResponse
        | APIFetchError<Record<string, string>>;
      if (option === "yes") response = await api.votePositive(token, params.id);
      else if (option === "no")
        response = await api.voteNegative(token, params.id);

      if ("error" in response) {
        console.log(response);
        setError(
          response.maybeJson
            ? response.maybeJson.error
            : "Something went wrong!"
        );
        return setAlertOpen(true);
      } else {
        alert("Vote successful!");
        navigate("/polls");
      }
    } catch (error) {
      alert("Vote failed!");
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
          p: "20px",
          border: "1px solid box.box",
          borderRadius: "8px",
        }}
      >
        <AppBar />
        {poll() ? (
          <>
            <Avatar
              alt={poll().discordSlug}
              src={poll().discordPfpUrl}
              sx={{ width: 56, height: 56, mx: "auto", mb: 2 }}
            />
            <Typography gutterBottom variant="h4">
              Vote in:{" "}
              {poll().discordUser !== null
                ? poll().discordUser
                : poll().discordSlug}
            </Typography>
            <Typography gutterBottom variant="body1" color="textSecondary">
              {`Full username: ${poll().discordSlug}`}
            </Typography>
            <Typography gutterBottom variant="body1" color="textSecondary">
              {`Positive votes: ${poll().positiveVotesInt}`}
            </Typography>
            <Typography gutterBottom variant="body1" color="textSecondary">
              {`Negative votes: ${poll().negativeVotesInt}`}
            </Typography>

            <Show when={poll().invite}>
              <Typography gutterBottom variant="body1" color="textSecondary">
                {`(ADMIN) Invite: ${poll().invite}`}
              </Typography>
            </Show>

            <ClosableAlert
              open={alertOpen()}
              severity="error"
              onClose={() => setAlertOpen(false)}
            >
              {error()}
            </ClosableAlert>

            <Show when={poll().ended === true}>
              <Alert severity="error">This poll has ended!</Alert>

              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Button variant="contained" color="primary">
                  Yes
                </Button>
                <Button variant="contained" color="error">
                  No
                </Button>
              </Stack>
            </Show>

            <Show when={poll().voted === true && poll().ended === false}>
              <Alert severity="error">You already voted!</Alert>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Button disabled variant="contained" color="primary">
                  Yes
                </Button>
                <Button disabled variant="contained" color="error">
                  No
                </Button>
              </Stack>
            </Show>
            <Show when={poll().voted === false && poll().ended === false}>
              <Stack
                spacing={2}
                direction="row"
                justifyContent="center"
                sx={{ mt: 2 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => vote("yes")}
                >
                  Yes
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => vote("no")}
                >
                  No
                </Button>
              </Stack>
            </Show>
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
      <Footer sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
};

export default VotePage;
