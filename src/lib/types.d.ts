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
	statusText: string,
	maybeJson?: string
}

export interface APIUsersVerifyResponse {
	discordId: string;
	token:     string;
	admin:     null;
}

export interface APIRegisterResponse {
	token: string;
	invite: string;
	iEventID: string;
	discordId: string;
}

export type userStore = loggedInUser | loggedOutUser

export type alertSeverity = 'error' | 'warning' | 'info' | 'success';