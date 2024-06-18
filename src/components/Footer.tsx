import { Box, Link, Typography } from "@suid/material";
import { version } from "../../package.json";
import { createSignal, onMount } from "solid-js";
import api from "../lib/api";

const Footer = (props: any) => {
  const [apiVersion, setApiVersion] = createSignal("");

  onMount(async () => {
    try {
      const response = await api.getApiInfo();
      if ("error" in response) {
        return setApiVersion("API Down!");
      } else {
        setApiVersion(response.version);
      }
    } catch (error) {
      alert("Failed to fetch polls!");
    }
  });

  return (
    <footer class="w-screen box-border mb-8">
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        Demo-Front: {version} | Demo-Server: {apiVersion()}
      </Typography>
    </footer>
  );
};

export default Footer;
