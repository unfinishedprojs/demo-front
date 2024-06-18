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
  Stack,
  Select,
  MenuItem,
  Grid,
} from "@suid/material";
import AppBar from "../components/AppBar";
import ClosableAlert from "../components/ClosableAlert";
import Footer from "../components/Footer";

const PollsPage = () => {
  const [polls, setPolls] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const navigate = useNavigate();
  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);
  const [page, setPage] = createSignal(1);
  const [sortMethod, setSortMethod] = createSignal("newest");
  const itemsPerPage = 5;

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const response = await api.getInviteEvents(
        localStorage.getItem("token"),
        { ended: "false" }
      );
      if ("error" in response) {
        setError(
          response.maybeJson
            ? response.maybeJson.error
            : "Something went wrong!"
        );
        setAlertOpen(true);
      } else {
        let sortedPolls = [...response.events] as unknown as {
          voted: boolean;
          createdAt: Date;
          positiveVotesInt: number;
          negativeVotesInt: number;
        }[];

        if (sortMethod() === "oldest") {
          sortedPolls = sortedPolls.sort(
            (a, b) =>
              (new Date(a.createdAt) as any) - (new Date(b.createdAt) as any)
          );
        } else if (sortMethod() === "newest") {
          sortedPolls = sortedPolls.sort(
            (a, b) =>
              (new Date(b.createdAt) as any) - (new Date(a.createdAt) as any)
          );
        } else if (sortMethod() === "minusvotes") {
          sortedPolls = sortedPolls.sort(
            (a, b) =>
              a.positiveVotesInt +
              a.negativeVotesInt -
              (b.positiveVotesInt + b.negativeVotesInt)
          );
        } else if (sortMethod() === "plusvotes") {
          sortedPolls = sortedPolls.sort(
            (a, b) =>
              b.positiveVotesInt +
              b.negativeVotesInt -
              (a.positiveVotesInt + a.negativeVotesInt)
          );
        }
        setPolls(sortedPolls);
      }
    } catch (error) {
      setError("Failed to fetch polls!");
      setAlertOpen(true);
    } finally {
      setLoading(false);
    }
  };

  onMount(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    try {
      const response = await api.verifyToken(localStorage.getItem("token"));
      if ("error" in response) {
        alert("Could not verify your token");
        navigate("/");
      } else {
      }
    } catch (error) {}

    fetchPolls();
  });

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
    fetchPolls();
  };

  const currentPolls = () => {
    const start = (page() - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return polls().slice(start, end);
  };

  const calculateTimeRemaining = (endsAt) => {
    const firstDate: Date = new Date(endsAt);

    const secondDate: Date = new Date();

    // Time Difference in Milliseconds
    const milliDiff: number = firstDate.getTime() - secondDate.getTime();

    // Converting time into hh:mm:ss format

    // Total number of seconds in the difference
    const totalSeconds = Math.floor(milliDiff / 1000);

    // Total number of minutes in the difference
    const totalMinutes = Math.floor(totalSeconds / 60);

    // Total number of hours in the difference
    const totalHours = Math.floor(totalMinutes / 60);

    // Getting the number of seconds left in one minute
    const remSeconds = totalSeconds % 60;

    // Getting the number of minutes left in one hour
    const remMinutes = totalMinutes % 60;

    return `${totalHours}h ${remMinutes}m ${remSeconds}s`;
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          bgcolor: "box.box",
          p: "20px",
          border: "1px solid box.box",
          borderRadius: "8px",
          width: "90vw",
        }}
      >
        <AppBar />

        <ClosableAlert
          open={alertOpen()}
          severity="error"
          onClose={() => setAlertOpen(false)}
        >
          {error()}
        </ClosableAlert>
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="h6"
            p="10px"
            sx={{ flexGrow: 1, userSelect: "none", cursor: "pointer" }}
          >
            Polls
          </Typography>
          <Select value={sortMethod()} onChange={handleSortChange}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">Oldest</MenuItem>
            <MenuItem value="plusvotes">Most votes</MenuItem>
            <MenuItem value="minusvotes">Least votes</MenuItem>
          </Select>
        </Box>
        <List>
          {loading()
            ? // Skeleton Loaders
              Array.from(new Array(itemsPerPage)).map((_, index) => (
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
            : currentPolls().map((poll) => (
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
                      <Typography
                        sx={{
                          flexGrow: 1,
                          userSelect: "none",
                          cursor: "pointer",
                        }}
                        p="10px"
                      >
                        {(poll.discordUser !== null
                          ? poll.discordUser
                          : poll.discordSlug) +
                          " | +" +
                          poll.positiveVotesInt +
                          " | -" +
                          poll.negativeVotesInt}
                      </Typography>
                      <Typography>
                        {(
                          (poll.positiveVotesInt /
                            (poll.positiveVotesInt + poll.negativeVotesInt)) *
                          100
                        ).toFixed(0) +
                          "% | " +
                          calculateTimeRemaining(poll.endsAt)}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                  <Divider variant="middle" component="li" />
                </>
              ))}
        </List>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                disabled={page() === 1}
                onClick={() => setPage(page() - 1)}
              >
                Previous
              </Button>
            </Grid>
            <Grid item xs>
              <Typography
                variant="body1"
                align="center"
                sx={{ justifyContent: "center" }}
              >
                Page {page()} of {Math.ceil(polls().length / itemsPerPage)}
              </Typography>
            </Grid>
            <Grid item xs>
              <Button
                variant="outlined"
                disabled={page() === Math.ceil(polls().length / itemsPerPage)}
                onClick={() => setPage(page() + 1)}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
};

export default PollsPage;
