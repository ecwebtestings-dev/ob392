import { emitSessionExpired } from "./sessionEvents";
const BASE_URL = import.meta.env.VITE_API_URL;
function getToken() {
    return localStorage.getItem('ob39_token');
}
function setToken(token) {
    if (token) localStorage.setItem('ob39_token', token);
    else localStorage.removeItem('ob39_token');
}


async function request(path, options = {}) {
    const hadToken = Boolean(getToken());

    let res;
    try {
        res = await fetch(`${BASE_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
                ...options.headers,
            },
            ...options,
        });
    } catch {
        throw new Error('Unable to connect. Please check your internet connection and try again.');
    }

    if (res.status === 401 && hadToken) {
        setToken(null);
        emitSessionExpired('expired');
        const err = new Error('Session expired');
        err.isSessionExpired = true;
        throw err;
    }

    if (!res.ok) {
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

// Public API surfaces

export const api = {
    get: (path) => request(path),
    post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
    put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
    patch: (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (path) => request(path, { method: 'DELETE' }),
    setToken,
    getToken,
};