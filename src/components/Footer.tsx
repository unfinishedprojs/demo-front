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
      console.error(error);
    }
  });

  return (
    <footer class="mb-8 box-border w-screen">
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
