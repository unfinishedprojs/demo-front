import { For, createSignal, onMount } from "solid-js";
import { IconButton, MenuItem, Select } from "@suid/material";
import { themes } from "../constants";

export const [theme, setTheme] = createSignal<"light" | "dark">(
  (localStorage.getItem("theme") as any) || "dark",
);

const ThemeToggle = (props) => {
  const changeTheme = (e) => {
    const newTheme = e.target.value;
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <Select value={theme()} onChange={changeTheme}>
      <For each={themes}>
        {(theme) => <MenuItem value={theme.value}>{theme.name}</MenuItem>}
      </For>
    </Select>
  );
};

export default ThemeToggle;
