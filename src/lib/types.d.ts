interface baseUser {
	status: string
}

interface loggedOutUser extends baseUser {
	status: 'loggedOut'
}

interface loggedInUser extends baseUser {
	status: 'loggedIn',
	token: string,
	discordID: string
}

export type userStore = loggedInUser | loggedOutUser