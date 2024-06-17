import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import "../css/form.css";
import { Box, Button, Container, Typography } from "@suid/material";
import Footer from "../components/Footer";
import NoLoginAppBar from "../components/NoLoginAppBar";

const RulesPage = () => {
  const [inviteCode, setInviteCode] = createSignal("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [loaded, setLoaded] = createSignal(false);
  const navigate = useNavigate();

  onMount(async () => {
    const value = searchParams.invite;

    if (value) {
      setInviteCode(value);
    }
    setLoaded(true);
  });

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
          width: "40vh",
          p: "20px",
          border: "1px solid box.box",
          borderRadius: "8px",
        }}
      >
        <NoLoginAppBar />
        <Typography variant="h4">Welcome!</Typography>
        <Typography>
          Here are some rules you should probably follow when using this
          instance:
        </Typography>
        <Typography>1. Don't tell anyone!</Typography>
        <Typography>
          2. Use common sense, both when voting and when talking in the group
        </Typography>
        <Typography>3. Be cute</Typography>
        <Typography paddingTop="10px" paddingBottom="10px">
          Once you are ready, press the Join Server button, and then read #info
        </Typography>

        <Button
          color="primary"
          variant="contained"
          href={`https://discord.gg/${inviteCode()}`}
          //   onClick={navigate(`https://discord.gg/${inviteCode}`)}
        >
          Join server
        </Button>
      </Box>
      <Footer sx={{ mt: 2, mb: 4 }} />
    </Container>
  );
};

export default RulesPage;
