import { createSignal, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import Button from "@suid/material/Button";
import ThemeToggle from "../components/ThemeToggle";
import api from "../lib/api";
import type { APIIVotePosResponse, APIIVoteNegResponse } from "../lib/types";
import "../css/form.css";
import LogOutButton from "../components/LogOut";
import { Stack } from "@suid/material";
import HomeButton from "../components/HomeButton";

const VotePage = () => {
  const params = useParams();
  const [poll, setPoll] = createSignal(null);

  onMount(async () => {
    try {
      const response = await api.getInviteEvent(
        localStorage.getItem("token"),
        params.id
      );
      if ("error" in response) {
        alert(`Failed to fetch poll: ${response.error}`);
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

      let response: APIIVotePosResponse | APIIVoteNegResponse;
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
    <div class="container">
      <div class="floating-box">
        <HomeButton color='action' /><ThemeToggle /> <LogOutButton />
        {poll() ? (
          <>
            <h1 class="text-2xl">Vote in: {poll().discordUser}</h1>
            <Stack spacing={2} direction="row">
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
          <p>Loading poll...</p>
        )}
      </div>
    </div>
  );
};

export default VotePage;
