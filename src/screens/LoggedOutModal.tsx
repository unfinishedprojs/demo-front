import { Button, TextField, Alert } from "@suid/material";
import { createSignal } from "solid-js";
import styles from './LoggedOutModal.module.css';
import api from '../lib/api';
import { setUser } from "../lib/user";


const [userToken, setUserToken] = createSignal('');
const [inviteCode, setInviteCode] = createSignal('');

const [alertVisible, showAlert] = createSignal(false);
const [errorMessage, setErrorMessage] = createSignal('');


async function login() {
	if (userToken() === '') {
		showAlert(true);
		setErrorMessage('Please enter a user token');
		return;
	}
	// tokens shouldn't ever be longer than 49 chars, but just in case
	const tokenValid = await api.verifyToken(userToken().slice(0, 51));
	if ('error' in tokenValid) {
		showAlert(true)
		if (tokenValid.status === 403) {
			setErrorMessage('Invalid token, try again.');
		} else {
			setErrorMessage(`Something went wrong: ${tokenValid.error}. More info in console.`);
			console.error(tokenValid);
		}
		return;
	} else {
		setUser({
			status: 'loggedIn',
			token: tokenValid.token,
			discordID: tokenValid.discordId
		})
	}
	console.log(tokenValid);

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
				autoComplete="off"
				onChange={(e) => setUserToken(e.currentTarget.value)}
      />
			<div class="flex gap-2">
				<Button variant="contained" class="w-max" >LocalStorage login</Button>
				<Button variant="contained" class="w-36" onClick={login}>Login</Button>
			</div>
		</div>
		<h2 class="text-md font-medium">Register</h2>
		<div class={styles.registerWrapper}>
			<TextField
        id="outlined-basic"
        label="Registration code"
        variant="outlined"
				style={{ 'grid-area': 'codeInput' }}
				autoComplete="off"
				helperText="Invite code provided to you by a senior"
				onChange={(e) => setInviteCode(e.currentTarget.value)}
      />
			<TextField
        id="outlined-basic"
        label="Discord ID"
        variant="outlined"
				autoComplete="off"
				helperText="Make sure it's your actual Discord ID"
				style={{ 'grid-area': 'discordIDInput' }}
      />
			<Button variant="contained" 
				class="w-36" style={{ 'grid-area': 'button' }}>Register</Button>
		</div>
		<p id="errorText" hidden={!alertVisible()}>
			<Alert severity="error" onClose={() => showAlert(false)}>{errorMessage()}</Alert>
		</p>
	</div>)
}