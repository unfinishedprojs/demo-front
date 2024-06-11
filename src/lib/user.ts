import { createStore } from "solid-js/store"
import type { userStore } from "./types"

export const [user, setUser] = createStore<userStore>({
	status: 'loggedOut'
})

// export const [user, setUser] = createStore<userStore>({
// 	status: 'loggedIn',
// 	token: import.meta.env.VITE_TEST_TOKEN
// })