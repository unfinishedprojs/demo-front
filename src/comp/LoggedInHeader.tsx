import { user, setUser } from "../lib/user";
import { setUserToken } from "../screens/LoggedOutModal";
import { Button } from "@suid/material";

function logout() {
	setUser({ status: 'loggedOut' })
	setUserToken('') // just in case
}

export default function LoggedInHeader() {
	if (user.status !== 'loggedIn') return (<div>not logged in</div>)
	return (
		<div class="flex flex-col gap-2 justify-center">
			<h1 class="text-2xl font-600">Democracy Server Voting Infra</h1>
			<div class="w-full flex justify-between gap-2 items-center">
				<h2 class="text-md font-medium">
					Logged in:&nbsp;
					<span class="bg-slate-700 rounded-md py-1 px-2 text-white">
						{user.discordID}
					</span>
				</h2>
				<Button variant="outlined" onClick={logout}>log out</Button>
			</div>
		</div>
	)
}