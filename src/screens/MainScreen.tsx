import { Button } from "@suid/material";
import { setUser } from "../lib/user";
import { setUserToken } from "./LoggedOutModal";

function getInviteEvents() {

}

function logout() {
	setUser({ status: 'loggedOut' })
	setUserToken('') // just in case
}

export default function MainScreen() {
	return (<div>
		user is logged in
		<Button onClick={logout}>log out</Button>
	</div>)
}