import { emitSessionExpired } from "./sessionEvents";

// Base URL for the OB39 API — set via the VITE_API_URL env var so it can
// differ between local dev, staging, and production without code changes.
const BASE_URL = import.meta.env.VITE_API_URL;

// Reads the current auth token from localStorage.
// Returns null if the user isn't logged in (or has been logged out).
function getToken() {
    return localStorage.getItem('ob39_token');
}

// Saves or clears the token.
// Pass a token string to log in / persist it; pass null/undefined to log out.
function setToken(token) {
    if (token) localStorage.setItem('ob39_token', token);
    else localStorage.removeItem('ob39_token');
}

// Shared fetch wrapper for all API calls.
// Every request made through `api.get/post/put/patch/delete` funnels
// through here, so this is the single place that:
//   - attaches JSON headers and the bearer token (when present)
//   - normalizes network failures into a friendly error message
//   - normalizes HTTP error responses into a thrown Error with a message
//   - parses the JSON body for successful responses (or returns null for 204s)
async function request(path, options = {}) {
    let res;
    try {
        res = await fetch(`${BASE_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                // Only attach Authorization if we actually have a token —
                // avoids sending "Bearer null" on public/unauthenticated routes.
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
                ...options.headers,
            },
            ...options,
        });
    } catch {
        // fetch() itself throws (not res.ok being false) when the request
        // never reached a server at all — no internet, DNS failure, server
        // down/unreachable, CORS preflight failure, etc.
        throw new Error('Unable to connect. Please check your internet connection and try again.');
    }

    if (res.status === 401) {
        // Sanctum returns 401 when the token is missing, malformed, or
        // expired — all of which mean "the session is no longer valid."
        // Clear the stale token and broadcast a global event so the app
        // can show a "session expired" prompt instead of leaving whatever
        // request happened to trigger this to fail with a confusing,
        // seemingly-unrelated error (e.g. "failed to load resources").
        setToken(null);
        emitSessionExpired('expired');
    }

    if (!res.ok) {
        // Try to pull a human-readable message out of the error response.
        // Most of our Laravel endpoints return JSON like { message: "..." },
        // but some error paths (e.g. a raw 500 HTML page, or a non-JSON
        // response) won't parse as JSON — fall back to the raw text in that case.
        let message;
        try {
            message = (await res.json()).message;
        }
        catch {
            message = await res.text();
        }
        // Every failed request throws here — callers catch this and show
        // `err.message` to the user (e.g. via a toast).
        throw new Error(message || `Error ${res.status}`);
    }

    // A 204 No Content response has no body to parse (e.g. some delete
    // endpoints) — trying to call res.json() on it would throw.
    return res.status === 204 ? null : res.json();
}

// Public API surface used throughout the app. Every method here is a thin
// wrapper around `request()` with the right HTTP verb baked in, so callers
// never need to think about fetch(), headers, or error handling directly —
// e.g. `await api.post('/event/create', formValues)`.
export const api = {
    get: (path) => request(path),
    post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
    put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
    patch: (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (path) => request(path, { method: 'DELETE' }),
    setToken,
    getToken,
};