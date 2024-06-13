interface baseUser {
  status: string;
}

interface loggedOutUser extends baseUser {
  status: "loggedOut";
}

interface loggedInUser extends baseUser {
  status: "loggedIn";
  token: string;
  discordID: string;
}

export interface APIFetchError<T extends Object = Record<string, string>> {
  error: string;
  status: number;
  statusText: string;
  maybeJson?: T;
}

export interface APIUsersVerifyResponse {
  discordId: string;
  token: string;
  admin: null;
}

export interface APIRegisterResponse {
  token: string;
  invite: string;
  iEventID: string;
  discordId: string;
}

export interface APIGetIEventResponse {
  eventId: string;
  discordId: string;
  invite: string;
  ended: boolean;
  createdAt: Date;
  duration: number;
  positiveVotesInt: number;
  negativeVotesInt: number;
}

export interface APIGetIEventsResponse {
  events: [
    eventId: string,
    discordId: string,
    invite: string,
    ended: boolean,
    createdAt: Date,
    duration: number,
    positiveVotesInt: number,
    negativeVotesInt: number
  ];
}

export interface APISuggestUserResponse {
  discordId?: string;
  eventId?: string;
  invite?: string;
  discordPicture?: string,
  ended?: boolean;
  createdAt?: Date;
  duration?: number;
  positiveVotes?: number;
  negativeVotes?: number;
}

export interface APIIVotePosResponse {
  id: number;
  userToken: string;
  iEventId: string;
  createdAt: Date;
}

export interface APIIVoteNegResponse {
  id: number;
  userToken: string;
  iEventId: string;
  createdAt: Date;
}

export interface APIRegisterErrorResponse {
  error: any;
  message: string;
}

export type userStore = loggedInUser | loggedOutUser;

export type alertSeverity = "error" | "warning" | "info" | "success";
