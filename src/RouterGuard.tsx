import { useNavigate } from "@solidjs/router";
import { createEffect, createSignal } from "solid-js";
import api from "./lib/api";
import { getToken } from "./utils/getToken";

export default function RouteGuard(props) {
  const navigate = useNavigate();
  const [loading, setLoaded] = createSignal(true);

  createEffect(async () => {
    const token = getToken();
    if (!token) {
      return navigate("/login", { replace: true });
    }
    const response = await api.verifyToken();
    if ("error" in response) {
      alert("Could not verify your token");
      return navigate("/login");
    }

    setLoaded(false);
  });

  return <>{loading() ? <></> : props.children}</>;
}
