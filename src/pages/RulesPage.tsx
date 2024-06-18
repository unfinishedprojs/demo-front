import { createSignal, onMount, Show } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import { Box, Button, Container, Typography } from "@suid/material";
import Footer from "../components/Footer";
import NoLoginAppBar from "../components/NoLoginAppBar";
import AppBar from "../components/AppBar";
import { Center } from "../components/Center";

const RulesPage = () => {
  const [inviteCode, setInviteCode] = createSignal("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loaded, setLoaded] = createSignal(false);

  onMount(async () => {
    const value = searchParams.invite;

    if (value) {
      setInviteCode(value);
    }
    setLoaded(true);
  });

  return (
    <Center>
      <Box
        sx={{
          bgcolor: "box.box",
          p: "20px",
          border: "1px solid box.box",
          borderRadius: "8px",
        }}
      >
        <Show when={localStorage.getItem("token") === "null"}>
          <NoLoginAppBar />
        </Show>
        <Typography variant="h4">Welcome!</Typography>
        <Typography>
          Here are some rules you should probably follow when using this
          instance:
        </Typography>
        <Typography>1. Don't tell anyone!</Typography>
        <Typography>
          2. Use common sense, both when voting and when talking in the group
        </Typography>
        <Typography>
          3. If you abuse the system in a disruptive way, you will get a 24h ban
          from the service for first offense,
        </Typography>
        <Typography>4. Be cute</Typography>

        <Show when={searchParams.invite}>
          <Typography paddingTop="10px" paddingBottom="10px">
            Once you are ready, press the Join Server button, and then read
            #info
          </Typography>

          <Button
            color="primary"
            variant="contained"
            href={`https://discord.gg/${inviteCode()}`}
          >
            Join server
          </Button>
        </Show>
      </Box>
    </Center>
  );
};

export default RulesPage;
