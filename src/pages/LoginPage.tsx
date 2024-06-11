import { createSignal } from 'solid-js';
import api from '../lib/api';

const LoginPage = () => {
  const [token, setToken] = createSignal('');

  const login = async () => {
    try {
      const response = await api.verifyToken(token());
      if ('error' in response) {
        alert(`Login failed: ${response.error}`);
      } else {
        localStorage.setItem('token', token());
        alert('Login successful!');
      }
    } catch (error) {
      alert('Login failed!');
    }
  };

  return (
    <div class="p-4">
      <h1 class="text-2xl">Login</h1>
      <input
        type="text"
        placeholder="Token"
        value={token()}
        onInput={(e) => setToken(e.currentTarget.value)}
        class="border p-2 m-2"
      />
      <button onClick={login} class="bg-blue-500 text-white p-2">
        Login
      </button>
    </div>
  );
};

export default LoginPage;
