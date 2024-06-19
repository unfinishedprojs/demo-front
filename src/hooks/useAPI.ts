import {
  createResource,
  createSignal,
  type Accessor,
  type Resource,
} from "solid-js";
import api from "../lib/api";
import type { APIFetchError } from "../lib/types";

interface useAPIResponseLoad {
  loading: Accessor<true>;
  error: Accessor<undefined>;
  response: Resource<undefined>;
}

interface useAPIResponseError {
  loading: Accessor<false>;
  error: Accessor<string>;
  response: Resource<undefined>;
}

interface useAPIResponse<Method extends keyof typeof api> {
  loading: Accessor<false>;
  error: Accessor<undefined>;
  response: Resource<
    Exclude<Awaited<ReturnType<(typeof api)[Method]>>, APIFetchError>
  >;
}

type useAPIAnswer<Method extends keyof typeof api> = (
  | useAPIResponseLoad
  | useAPIResponseError
  | useAPIResponse<Method>
) & {
  refetch: (info?: unknown) => void | Promise<void>;
};

export const useAPI = <Method extends keyof typeof api>(
  method: Method,
  ...params: Parameters<(typeof api)[Method]>
): useAPIAnswer<Method> => {
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(undefined);

  const [data, { refetch }] = createResource(async () => {
    // Shut up ts. IT IS RIGHT
    // @ts-ignore
    return api[method](...params)
      .then((result) => {
        if ("error" in result) {
          setError(
            result.maybeJson ? result.maybeJson.error : "Something went wrong!",
          );
          return;
        }
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch");
      })
      .finally(() => setLoading(false));
  });

  // TRUE CAN'T BE BOOLEAN???
  // @ts-ignore
  return { loading, error, response: data, refetch };
};
