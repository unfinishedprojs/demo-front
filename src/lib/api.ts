import type {
  APIUsersVerifyResponse,
  APIFetchError,
  APIRegisterResponse,
  APIRegisterErrorResponse,
  APIGetIEventResponse,
  APIIVotePosResponse,
  APIGetIEventsResponse,
  APISuggestUserResponse,
  APIGetApiInfo,
} from "./types";

const baseURL = "https://api.samu.lol";

/** assumes res.ok === false */
async function handleError(requestType: string, res: Response) {
  const err: APIFetchError = {
    error: `API: ${requestType}: ${res.status} ${res.statusText}`,
    status: res.status,
    statusText: res.statusText,
  };
  try {
    err.maybeJson = await res.json();
  } catch (e) {}
  return err;
}

async function awaitedPost(
  endpoint: string,
  body: Record<string, unknown>,
  token: string | null = null
): Promise<unknown | APIFetchError> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `${token}`;

  const res = await fetch(`${baseURL}${endpoint}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) return await handleError("awaitedPost", res);
  const json = await res.json();
  return json;
}

async function awaitedGet(
  endpoint: string,
  body: Record<string, string> = {},
  token: string | null = null
): Promise<unknown | APIFetchError> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (token) headers["Authorization"] = `${token}`;

  let res: Response;
  if (body) {
    const url = new URL(`${baseURL}${endpoint}`);
    url.search = new URLSearchParams(body).toString();
    res = await fetch(url.toString(), { headers: headers });
  } else {
    res = await fetch(`${baseURL}${endpoint}`, { headers: headers });
  }

  if (!res.ok) return await handleError("awaitedPost", res);
  const json = await res.json();
  return json as unknown;
}

export const api = {
  login: async (password: string, discordId: string) => {
    return (await awaitedPost("/api/v2/users/login", {
      password,
      discordId,
    })) as APIUsersVerifyResponse | APIFetchError;
  },
  verifyToken: async (token: string) => {
    return (await awaitedGet("/api/v2/users/get", {}, token)) as
      | APIUsersVerifyResponse
      | APIFetchError;
  },
  register: async (inviteCode: string, discordId: string, password: string) => {
    return (await awaitedPost("/api/v2/users/register", {
      invite: inviteCode,
      discordId,
      password,
    })) as APIRegisterResponse | APIFetchError<APIRegisterErrorResponse>;
  },
  getApiInfo: async () => {
    return (await awaitedGet("/")) as APIGetApiInfo | APIFetchError;
  },
  getInviteEvents: async (token: string, opts: Record<string, string> = {}) => {
    return (await awaitedGet("/api/v2/ievents/getall", opts, token)) as
      | APIGetIEventsResponse
      | APIFetchError;
  },
  getInviteEvent: async (token: string, eventId: string) => {
    return (await awaitedGet(
      "/api/v2/ievents/get",
      {
        eventId: eventId,
      },
      token
    )) as APIGetIEventResponse | APIFetchError;
  },
  votePositive: async (token: string, eventId: string) => {
    return (await awaitedPost(
      "/api/v2/ievents/vote/positive",
      {
        eventId: eventId,
      },
      token
    )) as APIIVotePosResponse | APIFetchError;
  },
  voteNegative: async (token: string, eventId: string) => {
    return (await awaitedPost(
      "/api/v2/ievents/vote/negative",
      {
        eventId: eventId,
      },
      token
    )) as APIIVotePosResponse | APIFetchError;
  },
  suggestUser: async (discordId: string, token: string) => {
    return (await awaitedPost(
      "/api/v2/ievents/suggest",
      { discordId },
      token
    )) as APISuggestUserResponse | APIFetchError;
  },
  deleteEvent: async (eventId: string, token: string) => {
    return (await awaitedPost(
      "/api/v2/admin/deleteevent",
      { eventId },
      token
    )) as APISuggestUserResponse | APIFetchError;
  },
  createCustomRole: async (roleColour: string, roleName: string, token: string) => {
    return (await awaitedPost(
      "/api/v2/users/role",
      { roleColour, roleName },
      token
    )) as APISuggestUserResponse | APIFetchError;
  },
};
export default api;
