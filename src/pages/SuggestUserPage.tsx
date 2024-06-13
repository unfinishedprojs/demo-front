import { createSignal } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import ThemeToggle from "../components/ThemeToggle";
import api from "../lib/api";
import '../css/form.css'
import LogOutButton from "../components/LogOut";

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
        <ThemeToggle /> <LogOutButton />
        <h1 class="text-2xl">Suggest a User</h1>
        <TextField
          label="DiscordID"
          variant="outlined"
          onInput={(e) => setDiscordId(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={suggestUser}>
          Suggest User
        </Button>
      </div>
    </div>
  );
};

export default SuggestUserPage;
