import { fetchJSON } from "./fetch-json";

const headers = {
  "Content-Type": "application/json",
};

const API_URL = `${process.env.REACT_APP_DOMAIN}`;

function call<T>(
  path: string,
  options: { headers?: any; method?: string; body?: any } = {}
) {
  const url = `${API_URL}/${path}`;

  return fetchJSON<T>(url, options).catch((error: any) => {
    return Promise.reject(error);
  });
}

const get = <T>(path: string) => {
  return call<T>(path, { method: "GET" });
};

export const http = {
  get,
};
