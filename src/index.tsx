/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";

import './assets/main.css';
import '@fontsource/poppins';
import '@fontsource-variable/inter';

render(() => <App />, document.getElementById("root")!);
