const defaultMessage = ({ status, statusText }: Response) =>
  statusText || `${status} error code occurred`;

export async function fetchJSON<T>(url: string, options: any = {}) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  options.headers = options.headers
    ? {
        ...headers,
        ...options.headers
      }
    : headers;

  if (options.body) {
    options.body = JSON.stringify(options.body);
  }

  const response = await fetch(url, options);

  try {
    const json = await response.json();
    return response.ok
      ? json as T 
      : Promise.reject({
          ...json,
          status: json.status || response.status,
          message: json.message || defaultMessage(response)
        });
  } catch (error) {
    return Promise.reject({
          status: response.status,
          message: defaultMessage(response)
        });
  }
}
