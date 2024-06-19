import { getToken } from "../utils/getToken";
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
  const err = {
    error: `API: ${requestType}: ${res.status} ${res.statusText}`,
    status: res.status,
    statusText: res.statusText,
    maybeJson: undefined,
  } satisfies APIFetchError;
  try {
    err.maybeJson = await res.json();
  } catch (e) {}
  return err;
}

async function awaitedPost<Response extends Record<string, any>>(
  endpoint: string,
  body: Record<string, unknown>,
): Promise<Response | APIFetchError> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();
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

async function awaitedGet<Response extends Record<string, any>>(
  endpoint: string,
  body: Record<string, string> = {},
): Promise<Response | APIFetchError> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) headers["Authorization"] = token;

  const url = new URL(`${baseURL}${endpoint}`);
  url.search = new URLSearchParams(body).toString();
  const res = await fetch(url, { headers });

  if (!res.ok) return await handleError("awaitedPost", res);
  return await res.json();
}

export const api = {
  login: async (password: string, discordId: string) => {
    return await awaitedPost<APIUsersVerifyResponse>("/api/v2/users/login", {
      password,
      discordId,
    });
  },
  verifyToken: async () => {
    return await awaitedGet<APIUsersVerifyResponse>("/api/v2/users/get", {});
  },
  register: async (inviteCode: string, discordId: string, password: string) => {
    return (await awaitedPost<APIRegisterResponse>("/api/v2/users/register", {
      invite: inviteCode,
      discordId,
      password,
    })) as APIRegisterResponse | APIFetchError<APIRegisterErrorResponse>;
  },
  getApiInfo: async () => {
    return await awaitedGet<APIGetApiInfo>("/");
  },
  getInviteEvents: async (opts: Record<string, string> = {}) => {
    return await awaitedGet<APIGetIEventsResponse>(
      "/api/v2/ievents/getall",
      opts,
    );
  },
  getInviteEvent: async (eventId: string) => {
    return await awaitedGet<APIGetIEventResponse>("/api/v2/ievents/get", {
      eventId: eventId,
    });
  },
  votePositive: async (eventId: string) => {
    return await awaitedPost<APIIVotePosResponse>(
      "/api/v2/ievents/vote/positive",
      {
        eventId: eventId,
      },
    );
  },
  voteNegative: async (eventId: string) => {
    return await awaitedPost<APIIVotePosResponse>(
      "/api/v2/ievents/vote/negative",
      {
        eventId: eventId,
      },
    );
  },
  suggestUser: async (discordId: string) => {
    return await awaitedPost<APISuggestUserResponse>(
      "/api/v2/ievents/suggest",
      { discordId },
    );
  },
  deleteEvent: async (eventId: string) => {
    return await awaitedPost<APISuggestUserResponse>(
      "/api/v2/admin/deleteevent",
      { eventId },
    );
  },
  createCustomRole: async (roleColour: string, roleName: string) => {
    return await awaitedPost<APISuggestUserResponse>("/api/v2/users/role", {
      roleColour,
      roleName,
    });
  },
};
export default api;
