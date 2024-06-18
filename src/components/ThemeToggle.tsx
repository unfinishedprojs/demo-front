import { createSignal, onMount } from "solid-js";
import Brightness4Icon from "@suid/icons-material/Brightness4";
import Brightness7Icon from "@suid/icons-material/Brightness7";
import { IconButton } from "@suid/material";

export const [theme, setTheme] = createSignal<"light" | "dark">(
  (localStorage.getItem("theme") as any) || "dark"
);

const ThemeToggle = (props) => {
  onMount(() => {
    document.documentElement.setAttribute("data-theme", theme());
  });

  const toggleTheme = () => {
    // location.reload()
    const newTheme = theme() === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <IconButton onClick={toggleTheme}>
      {theme() === "light" ? (
        <Brightness4Icon {...props} />
      ) : (
        <Brightness7Icon />
      )}
    </IconButton>
  );
};

export default ThemeToggle;
