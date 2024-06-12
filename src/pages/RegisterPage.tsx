import { createSignal } from "solid-js";
import api from "../lib/api";
import "../css/form.css";

const RegisterPage = () => {
  const [discordId, setDiscordId] = createSignal("");
  const [inviteCode, setInviteCode] = createSignal("");

  const register = async () => {
    try {
      const response = await api.register(inviteCode(), discordId());
      if ("error" in response) {
        alert(`Registration failed: ${response.error}`);
      } else {
        localStorage.setItem("token", response.token);
        alert("Registration successful!");
        window.location.href = `/polls`
      }
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <div class="container">
      <div class="floating-box">
        <div class="p-4">
          <h1 class="text-2xl">Register</h1>
          <br></br>
          <sl-input
            label="Discord ID"
            help-text="Your Discord ID"
            onInput={(e) => setDiscordId(e.currentTarget.value)}
          ></sl-input>
          <br></br>
          <sl-input
            label="Invite"
            help-text="Invite given to you"
            onInput={(e) => setInviteCode(e.currentTarget.value)}
          ></sl-input>
          <br></br>
          <sl-button variant="primary" onClick={register}>
            Register
          </sl-button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
