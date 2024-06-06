import type { 
	APIUsersVerifyResponse, 
	APIFetchError 
} from "./types";

const baseURL = 'http://158.179.221.229:5000'

async function awaitedPost(
	endpoint: string, 
	body: Record<string, unknown>, 
	token: string | null = null
): Promise<unknown | APIFetchError> {
	const headers: Record<string, string> = { 'Content-Type': 'application/json' }
	if (token) headers['Authorization'] = `${token}`

	const res = await fetch(`${baseURL}${endpoint}`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(body),
	})

	if (!res.ok) {
		return { 
			error: `API: awaitedPost: ${res.status} ${res.statusText}`,
			status: res.status,
			statusText: res.statusText
		} satisfies APIFetchError;
	}
	const json = await res.json()
	return json
}

async function awaitedGet(
	endpoint: string, 
	body: Record<string, string>, 
	token: string | null = null
): Promise<unknown | APIFetchError> {
	const headers: Record<string, string> = { 'Content-Type': 'application/json' }
	if (token) headers['Authorization'] = `${token}`

	const url = new URL(`${baseURL}${endpoint}`)
	url.search = new URLSearchParams(body).toString()
	const res = await fetch(url.toString(), { headers: headers, })

	if (!res.ok) {
		return { 
			error: `API: awaitedGet: ${res.status} ${res.statusText}`,
			status: res.status,
			statusText: res.statusText
		} satisfies APIFetchError;
	}
	const json = await res.json()
	return json as unknown
}

export const api = {
	verifyToken: async (token: string) => {
		return await awaitedPost('/api/users/verify', {}, token) as APIUsersVerifyResponse | APIFetchError
	},

}
export default api;