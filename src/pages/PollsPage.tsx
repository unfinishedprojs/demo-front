import {
  Show,
  createEffect,
  createMemo,
  createResource,
  createSignal,
} from "solid-js";
import { useNavigate } from "@solidjs/router";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
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
} from "@suid/material";
import ClosableAlert from "../components/ClosableAlert";
import { calculateTimeRemaining } from "../utils/calculateRemainingTime";
import type { APIGetIEventResponse } from "../lib/types";
import { sortPolls, SortBy } from "../utils/sortPolls";
import { UserListItemsLoadingSkeleton } from "../components/UserListItemSkeleton";
import { fetchApi } from "../utils/fetchApi";

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
  const [page, setPage] = createSignal(1);
  const [sortMethod, setSortMethod] = createSignal<SortBy>(SortBy.Newest);
  const itemsPerPage = 5;
  const [rawPolls] = createResource(() =>
    fetchApi("getInviteEvents", { ended: "false" }),
  );

  const [showAlert, setAlert] = createSignal(false);

  const polls = createMemo(() =>
    sortPolls(rawPolls()?.events || [], sortMethod()),
  );

  const handleSortChange = (event) => {
    setSortMethod(event.target.value);
  };

  const currentPolls = createMemo(() => {
    const start = (page() - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return polls().slice(start, end);
  });

  return (
    <Box
      class="w-[90%] rounded-md p-4 md:w-[60vw]"
      sx={{
        bgcolor: "box.box",
        border: "1px solid box.box",
      }}
    >
      <ClosableAlert
        open={showAlert()}
        severity="error"
        onClose={() => setAlert(false)}
      >
        {rawPolls.error}
      </ClosableAlert>
      <Box class="flex" sx={{ display: "flex" }}>
        <Typography
          class="flex-1 cursor-pointer select-none"
          variant="h6"
          p="10px"
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
        <Show
          when={!rawPolls.loading}
          fallback={<UserListItemsLoadingSkeleton itemAmount={itemsPerPage} />}
        >
          {currentPolls().map((poll) => (
            <UserListItem poll={poll} />
          ))}
        </Show>
      </List>
      <Box class="mt-2 flex justify-center">
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid class="flex justify-end" item xs>
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
              class="justify-center text-center"
              variant="body1"
              align="center"
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

export default PollsPage;
