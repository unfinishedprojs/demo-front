import { Show } from "solid-js";
import { user } from './lib/user'

import LoggedOutScreen from "./screens/LoggedOutModal";
import MainScreen from "./screens/MainScreen";

export default function App() {
  return (
	<div class="flex items-center justify-center w-full h-screen">
		<Show when={user.status === 'loggedIn'} fallback={<LoggedOutScreen />}>
			<MainScreen />
		</Show>
	</div>
	);
}
