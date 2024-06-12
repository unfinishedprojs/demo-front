import { createSignal, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import api from "../lib/api";
import type { APIIVoteNegResponse, APIIVotePosResponse } from "../lib/types";
import "../css/form.css";

const VotePage = () => {
  const params = useParams<{ id: string }>();
  const [poll, setPoll] = createSignal<any>(null);

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
        console.log(poll());
      }
    } catch (error) {
      alert("Failed to fetch poll!");
    }
  });

  const vote = async (option: "yes" | "no") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      let response: APIIVotePosResponse | APIIVoteNegResponse;
      if (option === "yes") response = await api.votePositive(token, params.id);
      else if (option === "no")
        response = await api.voteNegative(token, params.id);

      if ("error" in response) {
        console.log(response);

        if (response.status === 406) return alert("Vote already cast. Ignored");

        alert(`Failed to submit vote: ${response.error}`);
      } else {
        alert("Vote submitted!");
      }
    } catch (error) {
      alert("Failed to submit vote!");
    }
  };

  return (
    <div class="container">
      <div class="floating-box">
        <div class="p-4">
          {poll() ? (
            <>
              <sl-avatar image={poll().discordPicture} loading="lazy"></sl-avatar> <h1 class="text-2xl">Vote in: {poll().discordUser}</h1>
              <div class="flex gap-4 mt-4">
                <sl-button variant="success" onClick={() => vote("yes")}>
                  Vote yes
                </sl-button>
                <sl-button variant="danger" onClick={() => vote("no")}>
                  Vote no
                </sl-button>
              </div>
            </>
          ) : (
            <p>Loading poll...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VotePage;
