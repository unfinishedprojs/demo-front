import { createSignal } from "solid-js";
import api from "../lib/api";
import "../css/form.css";

const SuggestUserPage = () => {
  const [discordId, setDiscordId] = createSignal("");

  const suggestUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please login first.");
        return;
      }

      const response = await api.suggestUser(discordId(), token);
      if ("error" in response) {
        alert(`Suggestion failed: ${response.error}`);
      } else {
        if (!response.duration) {
          alert("Suggestion received! Thank you!");
        } else if (response.duration) {
          alert(
            "This user has been suggested enough times. A poll has been created!"
          );
        }
      }
    } catch (error) {
      alert("Suggestion failed!");
    }
  };

  return (
    <div class="container">
      <div class="floating-box">
        <div class="p-4">
          <h1 class="text-2xl">Suggest a user</h1>
          <br></br>
          <sl-input
            label="Discord ID"
            help-text="Your Discord ID"
            onInput={(e) => setDiscordId(e.currentTarget.value)}
          ></sl-input>
          <br></br>
          <sl-button variant="primary" onClick={suggestUser}>
            Register
          </sl-button>
        </div>
      </div>
    </div>
  );
};

export default SuggestUserPage;
