import { createSignal, onMount } from 'solid-js';
import Brightness4Icon from '@suid/icons-material/Brightness4';
import Brightness7Icon from '@suid/icons-material/Brightness7';

export const [theme, setTheme] = createSignal(localStorage.getItem('theme') || 'dark');

const ThemeToggle = () => {

  onMount(() => {
    document.documentElement.setAttribute('data-theme', theme());
  });

  const toggleTheme = () => {
    location.reload()
    const newTheme = theme() === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      {theme() === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
    </button>
  );
};

export default ThemeToggle;