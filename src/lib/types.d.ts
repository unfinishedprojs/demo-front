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

export interface APIFetchError<T extends Object = Record<string, string>> {
	error: string,
	status: number,
	statusText: string,
	maybeJson?: T
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

export interface APIRegisterErrorResponse {
	message: string;
}

export type userStore = loggedInUser | loggedOutUser

export type alertSeverity = 'error' | 'warning' | 'info' | 'success';