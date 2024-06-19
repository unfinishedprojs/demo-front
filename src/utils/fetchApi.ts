import api from "../lib/api";
import type { APIFetchError } from "../lib/types";

export const fetchApi = async <Method extends keyof typeof api>(
  method: Method,
  ...params: Parameters<(typeof api)[Method]>
): Promise<
  Exclude<Awaited<ReturnType<(typeof api)[Method]>>, APIFetchError>
> => {
  // Shut up ts. IT IS RIGHT
  // @ts-ignore
  const resp = await api[method](...params);

  if ("error" in resp) {
    throw new Error(resp.maybeJson?.error || "Something went wrong!");
  }

  // @ts-ignore
  return resp;
};
