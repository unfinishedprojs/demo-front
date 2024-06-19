import { createSignal } from "solid-js";
import TextField from "@suid/material/TextField";
import Button from "@suid/material/Button";
import api from "../lib/api";
import { Box, Divider } from "@suid/material";
import ClosableAlert from "../components/ClosableAlert";
import { useNavigate } from "@solidjs/router";
import { Center } from "../components/Center";
import ThemeToggle from "../components/ThemeToggle";

const SettingsPage = () => {
  return (
    <Center>
      <Box
        class="w-[90%] rounded-md p-4 md:w-[30vw]"
        sx={{
          bgcolor: "box.box",
          border: "1px solid box.box",
        }}
      >
        <h1 class="text-2xl">Settings</h1>
        <Divider sx={{ marginTop: "10px", marginBottom: "10px" }}></Divider>
        <h2>Theme</h2>
        <ThemeToggle />
      </Box>
    </Center>
  );
};

export default SettingsPage;
