import { Button } from "@suid/material";
import { user, setUser } from "../lib/user";
import { Suspense, createEffect, createResource } from "solid-js";
import api from "../lib/api";
import InviteTable from "../comp/InviteTable";
import LoggedInHeader from "../comp/LoggedInHeader";

const userStatus = () => user.status

const [inviteEvents, { mutate, refetch}] = createResource(async () => {
	console.log('fetched res')
	if (user.status !== 'loggedIn') return []
	return await api.getInviteEvents(user.token)
})


export default function MainScreen() {
	return (
	<div class="w-auto flex flex-col justify-center gap-5
	p-8 bg-slate-300 rounded-lg
">
		<LoggedInHeader />
		<Suspense fallback={<div>loading...</div>}>
			<InviteTable inviteData={inviteEvents()} />
		</Suspense>
	</div>
)
}