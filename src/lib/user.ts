import { createStore } from "solid-js/store"
import type { userStore } from "./types"

export const [user, setUser] = createStore<userStore>({
	status: 'loggedOut'
})