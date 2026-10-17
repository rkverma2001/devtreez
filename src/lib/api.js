// Small client for the devtreez backend (Devtreez/backend).
// Set VITE_API_URL in .env (e.g. https://api.devtreez.com); defaults to the local dev server.
export const API_URL = (import.meta.env.VITE_API_URL ?? "http://localhost:5000").replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, { status, fields } = {}) {
    super(message);
    this.status = status;
    this.fields = fields ?? {};
  }
}

async function request(method, path, body) {
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("We couldn't reach our server. Please check your connection and try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(data.error ?? "Something went wrong. Please try again.", { status: res.status, fields: data.fields });
  return data;
}

export const api = {
  get: (path) => request("GET", path),
  post: (path, body) => request("POST", path, body),
};
