import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemText from "@suid/material/ListItemText";
import api from "../lib/api";
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
  Select,
  MenuItem,
  Grid,
  useMediaQuery,
} from "@suid/material";
import ClosableAlert from "../components/ClosableAlert";
import { calculateTimeRemaining } from "../utils/calculateRemainingTime";
import type { APIGetIEventResponse, APIGetIEventsResponse } from "../lib/types";
import { sortPolls, SortBy } from "../utils/sortPolls";
import { UserListItemLoadingSkeleton } from "../components/UserListItemSkeleton";
import { MOBILE_MEDIA_QUERY } from "../utils/mobileMediaQuery";

const UserListItem = ({ poll }: { poll: APIGetIEventResponse }) => {
  const navigate = useNavigate();

  const userSlugText =
    (poll.discordUser ? poll.discordUser : poll.discordSlug) +
    ` | +${poll.positiveVotesInt} | -${poll.negativeVotesInt}`;

  const pollPercentage =
    ((poll.positiveVotesInt / (poll.positiveVotesInt + poll.negativeVotesInt)) *
      100) |
    0;

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => navigate(`/vote/${poll.eventId}`)}>
          <ListItemAvatar>
            <Avatar alt={poll.discordSlug} src={poll.discordPfpUrl} />
          </ListItemAvatar>
          <Typography
            sx={{
              flexGrow: 1,
              userSelect: "none",
              cursor: "pointer",
            }}
            p="10px"
          >
            {userSlugText}
          </Typography>
          <Typography>
            {pollPercentage + "% | " + calculateTimeRemaining(poll.endsAt)}
          </Typography>
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

const PollsPage = () => {
  const [polls, setPolls] = createSignal<APIGetIEventsResponse["events"]>([]);
  const [loading, setLoading] = createSignal(true);
  const navigate = useNavigate();
  const [error, setError] = createSignal("");
  const [alertOpen, setAlertOpen] = createSignal(false);
  const [page, setPage] = createSignal(1);
  const [sortMethod, setSortMethod] = createSignal<SortBy>(SortBy.Newest);
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);
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
        return;
      }

      const sortedPolls = sortPolls(response.events, sortMethod());

      setPolls(sortedPolls);
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

  return (
    <Box
      sx={{
        bgcolor: "box.box",
        p: "20px",
        border: "1px solid box.box",
        borderRadius: "8px",
        width: isMobile() ? "90%" : "60vw",
      }}
    >
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
          <MenuItem value={SortBy.Newest}>Newest</MenuItem>
          <MenuItem value={SortBy.Oldest}>Oldest</MenuItem>
          <MenuItem value={SortBy.PlusVotes}>Most votes</MenuItem>
          <MenuItem value={SortBy.MinusVotes}>Least votes</MenuItem>
        </Select>
      </Box>
      <List>
        {loading() ? (
          <UserListItemLoadingSkeleton itemAmount={itemsPerPage} />
        ) : (
          currentPolls().map((poll) => <UserListItem poll={poll} />)
        )}
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
  );
};

export default PollsPage;
