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

export interface APIFetchError {
	error: string,
	status: number,
	statusText: string
}

export interface APIUsersVerifyResponse {
	discordId: string;
	token:     string;
	admin:     null;
}

export type userStore = loggedInUser | loggedOutUser

export type alertSeverity = 'error' | 'warning' | 'info' | 'success';