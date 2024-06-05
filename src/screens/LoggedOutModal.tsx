import { Button } from "@suid/material";


export default function LoggedOutScreen() {
	return (<div class="w-auto flex flex-col justify-center gap-3
		p-8 bg-slate-300 rounded-lg
	">
		<h1 class="text-lg font-medium">Democracy Server Voting Infrastructure</h1>
		<Button variant="contained">Log in</Button>
		<Button variant="contained">Register</Button>
	</div>)
}