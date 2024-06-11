import { createSignal } from 'solid-js';
import api from '../lib/api';

const RegisterPage = () => {
  const [discordId, setDiscordId] = createSignal('');
  const [inviteCode, setInviteCode] = createSignal('');

  const register = async () => {
    try {
      const response = await api.register(inviteCode(), discordId());
      if ('error' in response) {
        alert(`Registration failed: ${response.error}`);
      } else {
        localStorage.setItem('token', response.token);
        alert('Registration successful!');
      }
    } catch (error) {
      alert('Registration failed!');
    }
  };

  return (
    <div class="p-4">
      <h1 class="text-2xl">Register</h1>
      <input
        type="text"
        placeholder="Discord ID"
        value={discordId()}
        onInput={(e) => setDiscordId(e.currentTarget.value)}
        class="border p-2 m-2"
      />
      <input
        type="text"
        placeholder="Invite Code"
        value={inviteCode()}
        onInput={(e) => setInviteCode(e.currentTarget.value)}
        class="border p-2 m-2"
      />
      <button onClick={register} class="bg-blue-500 text-white p-2">
        Register
      </button>
    </div>
  );
};

export default RegisterPage;
