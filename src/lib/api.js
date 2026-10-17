import { contactInfo } from "../data/siteContent";

// Client for the devtreez backend (Devtreez/backend).
// Set VITE_API_URL at build time (e.g. https://api.devtreez.com). In development it defaults to the local API.
const configuredUrl = import.meta.env.VITE_API_URL;
export const API_URL = (configuredUrl ?? "http://localhost:5000").replace(/\/$/, "");

/**
 * Whether a backend is available. Production builds without VITE_API_URL fall back to email:
 * forms open the visitor's mail app pre-filled to the company inbox, and the chat is hidden.
 */
export const apiEnabled = Boolean(configuredUrl) || import.meta.env.DEV;

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

/** Build a mailto: link to the company inbox with a subject and "Label: value" lines. */
export function mailtoLink(subject, fields) {
  const body = Object.entries(fields)
    .filter(([, value]) => value && String(value).trim())
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
  return `${contactInfo.emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Open the visitor's email app with a pre-filled message; returns the link so the UI can offer it again. */
export function sendByEmail(subject, fields) {
  const href = mailtoLink(subject, fields);
  window.location.href = href;
  return href;
}
