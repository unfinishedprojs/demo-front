import { Button } from "@suid/material";
import { setUser } from "../lib/user";

function getInviteEvents() {

}

function logout() {
	setUser({ status: 'loggedOut' })
}

export default function MainScreen() {
	return (<div>
		user is logged in
		<Button onClick={logout}>log out</Button>
	</div>)
}