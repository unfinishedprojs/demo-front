
const baseURL = 'http://158.179.221.229:5000'
// TODO add token header auth support

async function awaitedPost(endpoint: string, body: Record<string, unknown>) {
	const res = await fetch(`${baseURL}${endpoint}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', },
		body: JSON.stringify(body),
	})

	if (!res.ok) {
    const message = `API: awaitedPost: An error has occured: ${res.status}`;
    throw new Error(message);
  }
	const json = await res.json()
	return json
}

async function awaitedGet(endpoint: string, body: Record<string, string>) {
	const url = new URL(`${baseURL}${endpoint}`)
	url.search = new URLSearchParams(body).toString()
	const res = await fetch(url.toString(), {
		headers: { 'Content-Type': 'application/json', },
	})

	if (!res.ok) {
    const message = `API: awaitedPost: An error has occured: ${res.status}`;
    throw new Error(message);
  }
	const json = await res.json()
	return json
}

export const api = {
	req: () => {},
	verifyToken: async (token: string) => {
		return await awaitedGet('/api/ievents', { token })
	},
}
export default api;