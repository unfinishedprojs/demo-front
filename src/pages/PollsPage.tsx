import { createSignal, onMount } from "solid-js";
import { useNavigate } from "@solidjs/router";
import List from "@suid/material/List";
import ListItem from "@suid/material/ListItem";
import ListItemText from "@suid/material/ListItemText";
import ThemeToggle from "../components/ThemeToggle";
import api from "../lib/api";
import "../css/form.css";
import { Avatar, Button, Divider, ListItemAvatar, ListItemButton } from "@suid/material";
import LogOutButton from "../components/LogOut";

const PollsPage = () => {
  const [polls, setPolls] = createSignal([]);
  const navigate = useNavigate();

  onMount(async () => {
    try {
      const response = await api.getInviteEvents(localStorage.getItem("token"));
      if ("error" in response) {
        alert(`Failed to fetch polls: ${response.error}`);
      } else {
        setPolls(response.events);
      }
    } catch (error) {
      alert("Failed to fetch polls!");
    }
  });

  return (
    <div class="container">
      <div class="poll-floating-box">
        <ThemeToggle /> <LogOutButton />
        <h1 class="text-2xl">Polls</h1>
        <List>
          {polls().map((poll) => (
            <><ListItem>
              <ListItemButton
                onClick={() => navigate(`/vote/${poll.eventId}`)}
                key={poll.id}
                component={poll.id}
              >
                <ListItemAvatar>
                  <Avatar alt={poll.discordSlug} src={poll.discordPicture} />
                </ListItemAvatar>
                <ListItemText primary={poll.discordUser + ' | +' + poll.positiveVotesInt + ' | -' + poll.negativeVotesInt} />
              </ListItemButton>
            </ListItem><Divider variant="middle" component="li" /></>
          ))}
        </List>
        <Button variant="outlined" href="/suggest">
          Suggest new user
        </Button>
      </div>
    </div>
  );
};

export default PollsPage;
