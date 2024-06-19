import { createSignal, onMount, Show } from "solid-js";
import { useSearchParams } from "@solidjs/router";
import { Box, Button, Typography } from "@suid/material";
import NoLoginAppBar from "../components/NoLoginAppBar";
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
        class="w-[90%] rounded-md p-4 md:w-[30vw]"
        sx={{
          bgcolor: "box.box",
          border: "1px solid box.box",
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
          from the service for first offense, and permanently banned from the
          service for the second. This wont mean you are banned from the group
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
