import { createSignal, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import Button from "@suid/material/Button";
import api from "../lib/api";
import type { APIIVotePosResponse, APIIVoteNegResponse, APIFetchError } from "../lib/types";
import "../css/form.css";
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@suid/material";
import AppBar from "../components/AppBar";
import ClosableAlert from "../components/ClosableAlert";

const VotePage = () => {
  const params = useParams();
  const [poll, setPoll] = createSignal(null);

  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);

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

      let response: APIIVotePosResponse | APIIVoteNegResponse | APIFetchError<Record<string, string>>;
      if (option === "yes") response = await api.votePositive(token, params.id);
      else if (option === "no")
        response = await api.voteNegative(token, params.id);

      if ("error" in response) {
        alert(`Vote failed: ${response.error}`);
      } else {
        alert("Vote successful!");
      }
    } catch (error) {
      alert("Vote failed!");
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
        <AppBar />
        {poll() ? (
          <>
            <Avatar
              alt={poll().discordUser}
              src={poll().discordPicture}
              sx={{ width: 56, height: 56, mx: "auto", mb: 2 }}
            />
            <Typography gutterBottom variant="h4">
              Vote in: {poll().discordUser}
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

            <ClosableAlert
              open={alertOpen()}
              severity="error"
              onClose={() => setAlertOpen(false)}
            >
              {error()}
            </ClosableAlert>

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
          </>
        ) : (
          <CircularProgress />
        )}
      </Box>
    </Container>
  );
};

export default VotePage;
