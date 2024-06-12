import { createSignal, onMount } from "solid-js";
import api from "../lib/api";
import "../css/form.css";

const PollsPage = () => {
  const [polls, setPolls] = createSignal([]);

  onMount(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      const response = await api.getInviteEvents(token);

      if ("error" in response) {
        alert(`Failed to fetch polls: ${response.error}`);
      } else {
        setPolls(response.events);
      }
    } catch (error) {
      console.log(error);
      alert("Failed to fetch polls!");
    }
  });

  return (
    <div class="container">
      <div class="poll-floating-box">
        <div class="p-4">
          <h1 class="text-2xl">Polls</h1>
          <br />
          <sl-button
            variant="default"
            onClick={() => (window.location.href = `/suggest`)}
          >
            Suggest new user
          </sl-button>
          <br />
          <ul>
            {polls().map((poll) => (
              <li
                class="border p-2 m-2 cursor-pointer"
                onClick={() => (window.location.href = `/vote/${poll.eventId}`)}
              >
                <sl-avatar
                  image={poll.discordPicture}
                  loading="lazy"
                ></sl-avatar>{" "}
                {poll.discordSlug} | Ended? {poll.ended.toString()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PollsPage;
