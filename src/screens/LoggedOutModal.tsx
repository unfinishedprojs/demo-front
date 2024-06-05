import { Button, TextField } from "@suid/material";
import { createSignal } from "solid-js";
import styles from './LoggedOutModal.module.css';


const [userToken, setUserToken] = createSignal('');
const [inviteCode, setInviteCode] = createSignal('');

function login() {
	if (userToken() === '') return;

}


export default function LoggedOutScreen() {
	return (<div class="w-auto flex flex-col justify-center gap-5
		p-8 bg-slate-300 rounded-lg
	">
		<h1 class="text-2xl font-600">Democracy Server Voting Infra</h1>
		<h2 class="text-md font-medium">Login</h2>
		<div class="flex gap-2 flex-col items-end">
			<TextField
        id="outlined-basic"
        label="User token"
        variant="outlined"
				fullWidth
				onChange={(e) => setUserToken(e.currentTarget.value)}
      />
			<Button variant="contained" class="w-36" >Login</Button>
		</div>
		<h2 class="text-md font-medium">Register</h2>
		<div class={`${styles.registerWrapper}`}>
			<TextField
        id="outlined-basic"
        label="Registration code"
        variant="outlined"
				style={{ 'grid-area': 'codeInput' }}
				onChange={(e) => setInviteCode(e.currentTarget.value)}
      />
			<TextField
        id="outlined-basic"
        label="Discord ID"
        variant="outlined"
				style={{ 'grid-area': 'discordIDInput' }}
      />
			<Button variant="contained" 
				class="w-36" style={{ 'grid-area': 'button' }}>Register</Button>
		</div>
	</div>)
}