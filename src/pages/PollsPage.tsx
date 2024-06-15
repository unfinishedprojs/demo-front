import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemText from "@suid/material/ListItemText";
import api from "../lib/api";
import "../css/form.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  ListItemAvatar,
  ListItemButton,
  Typography,
  Skeleton,
} from "@suid/material";
import AppBar from "../components/AppBar";
import ClosableAlert from "../components/ClosableAlert";

const PollsPage = () => {
  const [polls, setPolls] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const navigate = useNavigate();
  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);

  onMount(async () => {
    try {
      const response = await api.getInviteEvents(
        localStorage.getItem("token"),
        { active: "false" }
      );
      if ("error" in response) {
        setError(
          response.maybeJson
            ? response.maybeJson.error
            : "Something went wrong!"
        );
        return setAlertOpen(true);
      } else {
        setPolls(response.events);
      }
    } catch (error) {
      alert("Failed to fetch polls!");
    } finally {
      setLoading(false);
    }
  });

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
        <Typography variant="h6" p="10px">
          Polls
        </Typography>
        <ClosableAlert
          open={alertOpen()}
          severity="error"
          onClose={() => setAlertOpen(false)}
        >
          {error()}
        </ClosableAlert>
        <List>
          {loading()
            ? // Skeleton Loaders
              Array.from(new Array(5)).map(() => (
                <>
                  <ListItem>
                    <ListItemButton>
                      <ListItemAvatar>
                        <Skeleton variant="circular" width={40} height={40} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={<Skeleton variant="text" width="80%" />}
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />
                </>
              ))
            : polls().map((poll) => (
                <>
                  <ListItem>
                    <ListItemButton
                      onClick={() => navigate(`/vote/${poll.eventId}`)}
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={poll.discordSlug}
                          src={poll.discordPfpUrl}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          poll.discordUser +
                          " | +" +
                          poll.positiveVotesInt +
                          " | -" +
                          poll.negativeVotesInt
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />
                </>
              ))}
        </List>
        <Button variant="outlined" href="/suggest">
          Suggest new user
        </Button>
      </Box>
    </Container>
  );
};

export default PollsPage;
