import type { alertSeverity } from "../lib/types";

import { Button, TextField, Alert, ButtonGroup } from "@suid/material";
import { createSignal } from "solid-js";
import styles from './LoggedOutModal.module.css';
import api from '../lib/api';
import { setUser } from "../lib/user";


const [userToken, setUserToken] = createSignal('');
const [inviteCode, setInviteCode] = createSignal('');
const [discordID, setDiscordID] = createSignal('');

const [alertVisible, showAlert] = createSignal(false);
const [alertSeverity, setAlertSeverity] = createSignal<alertSeverity>('error');
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
	}
	setUser({
		status: 'loggedIn',
		token: tokenValid.token,
		discordID: tokenValid.discordId
	})
	localStorage.setItem('token', tokenValid.token)
	showAlert(false);
	setUserToken('');

	// console.log(tokenValid);
}

function localStorageLogin() {
	const token = localStorage.getItem('token');
	if (!token) {
		setAlertSeverity('warning');
		showAlert(true)
		setErrorMessage('No token found in localStorage');
		return;
	}
	setUserToken(token);
	login();
}

function localStorageClear() {
	const token = localStorage.getItem('token');
	if (!token) return;
	localStorage.removeItem('token')
	setAlertSeverity('success');
	showAlert(true);
	setErrorMessage('Token removed from localStorage');
	setUserToken('');
}

async function register() {
	if (!inviteCode()) {
		showAlert(true);
		setErrorMessage('Please enter an invite code');
		return;
	}
	if (!discordID()) {
		showAlert(true);
		setErrorMessage('Please enter your Discord ID');
		return;
	}

	const res = await api.register(inviteCode(), discordID());
	if ('error' in res) {
		console.log(res)
		showAlert(true);
		const msg = res?.maybeJson.message ?? res.statusText
		setErrorMessage(`Registration failed! ${msg} (${res.status})`);
		return;
	}

	// Stole code from above :3

	setUser({
		status: 'loggedIn',
		token: res.token,
		discordID: res.discordId
	})
	localStorage.setItem('token', res.token)
	showAlert(false);
	setUserToken('');
}

function LoginSection() {
	return (<>
		<h2 class="text-md font-medium">Login</h2>
		<span class="text-sm">Once logged in, your token will be stored in localStorage</span>
		<div class="flex gap-2 flex-col items-end">
			<TextField
        id="outlined-basic"
        label="User token"
        variant="outlined"
				fullWidth
				autoComplete="off"
				onChange={(e) => setUserToken(e.currentTarget.value)}
      />
			<div class="w-full flex gap-2 justify-between">
				<ButtonGroup variant="outlined" class="w-max">
					<Button variant="outlined" disableRipple>localStorage</Button>	
					<Button variant="outlined" onClick={localStorageClear}>clear</Button>
					<Button variant="outlined" onClick={localStorageLogin}>login</Button>
				</ButtonGroup>
				<Button variant="contained" class="w-36" onClick={login}>Login</Button>
			</div>
		</div>
	</>)
}

function RegisterSection() {
	return (<>
		<h2 class="text-md font-medium">Register</h2>
		<div class={styles.registerWrapper}>
			<TextField
        id="outlined-basic"
        label="Invite code"
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
				style={{ 'grid-area': 'discordIDInput' }}
				autoComplete="off"
				helperText="Make sure it's your actual Discord ID"
				onChange={(e) => setDiscordID(e.currentTarget.value)}
      />
			<Button variant="contained" 
				class="w-36" style={{ 'grid-area': 'button' }}
				onClick={register}
			>Register</Button>
		</div>
</>)
}


export default function LoggedOutScreen() {
	return (<div class="w-auto flex flex-col justify-center gap-5
		p-8 bg-slate-300 rounded-lg
	">
		<h1 class="text-2xl font-600">Democracy Server Voting Infra</h1>
		<LoginSection />
		<RegisterSection />
		<p id="errorText" hidden={!alertVisible()}>
			<Alert severity={alertSeverity()} onClose={() => {
				showAlert(false);
				setAlertSeverity('error');
			}}>{errorMessage()}</Alert>
		</p>
	</div>)
}