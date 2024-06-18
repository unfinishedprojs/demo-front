import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

const theme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", theme);

render(() => <App />, document.getElementById("root") as HTMLElement);
