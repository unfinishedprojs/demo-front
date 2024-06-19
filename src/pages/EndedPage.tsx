import { createEffect, createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemText from "@suid/material/ListItemText";
import api from "../lib/api";
import {
  Avatar,
  Box,
  Button,
  Divider,
  ListItemAvatar,
  ListItemButton,
  Typography,
  Select,
  MenuItem,
  Grid,
  useMediaQuery,
} from "@suid/material";
import ClosableAlert from "../components/ClosableAlert";
import { SortBy, sortPolls } from "../utils/sortPolls";
import { UserListItemsLoadingSkeleton } from "../components/UserListItemSkeleton";
import type { APIGetIEventResponse } from "../lib/types";
import { useAPI } from "../hooks/useAPI";

const UserListItem = ({ poll }: { poll: APIGetIEventResponse }) => {
  const navigate = useNavigate();

  const userSlugText =
    (poll.discordUser ? poll.discordUser : poll.discordSlug) +
    ` | +${poll.positiveVotesInt} | -${poll.negativeVotesInt}`;

  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => navigate(`/vote/${poll.eventId}`)}>
          <ListItemAvatar>
            <Avatar alt={poll.discordSlug} src={poll.discordPfpUrl} />
          </ListItemAvatar>
          <ListItemText primary={userSlugText} />
        </ListItemButton>
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  );
};

const EndedPage = () => {
  const [alertOpen, setAlertOpen] = createSignal(false);
  const [page, setPage] = createSignal(1);
  const [sortMethod, setSortMethod] = createSignal<SortBy>(SortBy.Newest);
  const itemsPerPage = 5;
  const {
    loading,
    error,
    response: rawPolls,
  } = useAPI("getInviteEvents", { ended: "true" });
  createEffect(() => {
    setAlertOpen(!!error());
  });

  const polls = sortPolls(rawPolls()?.events || [], sortMethod());

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const currentPolls = () => {
    const start = (page() - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return polls.slice(start, end);
  };

  return (
    <Box
      class="w-[90%] rounded-md p-4 md:w-[60vw]"
      sx={{
        bgcolor: "box.box",
        border: "1px solid box.box",
      }}
    >
      <ClosableAlert
        open={alertOpen()}
        severity="error"
        onClose={() => setAlertOpen(false)}
      >
        {error()}
      </ClosableAlert>
      <Box class="flex">
        <Typography
          variant="h6"
          p="10px"
          sx={{ flexGrow: 1, userSelect: "none", cursor: "pointer" }}
        >
          Polls that ended
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
          <UserListItemsLoadingSkeleton itemAmount={itemsPerPage} />
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
              Page {page()} of {Math.ceil(polls.length / itemsPerPage)}
            </Typography>
          </Grid>
          <Grid item xs>
            <Button
              variant="outlined"
              disabled={page() === Math.ceil(polls.length / itemsPerPage)}
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

export default EndedPage;
