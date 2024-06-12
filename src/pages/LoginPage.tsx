import { createSignal } from "solid-js";
import api from "../lib/api";
import "../css/form.css";

const LoginPage = () => {
  const [token, setToken] = createSignal("");

  const login = async () => {
    try {
      const response = await api.verifyToken(token());
      if ("error" in response) {
        alert(`Login failed: ${response.error}`);
      } else {
        localStorage.setItem("token", token());
        alert("Login successful!");
        window.location.href = `/polls`
      }
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div class="container">
      <div class="floating-box">
        <div class="p-4">
          <h1 class="text-2xl">Login</h1>
          <br></br>
          <sl-input
            label="Token"
            help-text="Token you got on register"
            onInput={(e) => setToken(e.currentTarget.value)}
          ></sl-input>
          <br></br>
          <sl-button variant="primary" onClick={login}>
            Login
          </sl-button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
