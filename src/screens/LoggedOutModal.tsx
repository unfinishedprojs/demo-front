import { Button, TextField } from "@suid/material";


export default function LoggedOutScreen() {
	return (<div class="w-auto flex flex-col justify-center gap-3
		p-8 bg-slate-300 rounded-lg
	">
		<h1 class="text-lg font-medium">Democracy Server Voting Infra</h1>
		<div class="flex gap-2 flex-col items-end">
			<TextField
        id="outlined-basic"
        label="User token"
        variant="outlined"
				class="w-96"
      />
			<Button variant="contained" class="w-36" >Login</Button>
		</div>
		<div class="flex gap-2 flex-col items-end">
			<TextField
        id="outlined-basic"
        label="Account creation invite code"
        variant="outlined"
				class="w-96"
      />
			<Button variant="contained" class="w-36">Register</Button>
		</div>
	</div>)
}