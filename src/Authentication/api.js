const BASE_URL = import.meta.env.VITE_API_URL;

function getToken() {
    return localStorage.getItem('ob39_token');
}

// Saves or clears the token
function setToken(token) {
    if (token) localStorage.setItem('ob39_token', token);
    else localStorage.removeItem('ob39_token');
}

// Shared fetch wrapper for all API calls
async function request(path, options = {}) {
    let res;
    try {
        res = await fetch(`${BASE_URL}${path}`, {
            headers: {
                'Content-Type': 'application/json',
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
                ...options.headers,
            },
            ...options,
        });
    } catch {
        // Thrown when no internet, DNS, server unreachable
        throw new Error('Unable to connect. Please check your internet connection and try again.');
    }

    if (!res.ok) {
        let message;
        try {
            message = (await res.json()).message;
        }
        catch {
            message = await res.text();
        }
        throw new Error(message || `Error ${res.status}`);
    }

    // 204 = no body
    return res.status === 204 ? null : res.json();
}

export const api = {
    get: (path) => request(path),
    post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
    put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
    patch: (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) }),
    delete: (path) => request(path, { method: 'DELETE' }),
    setToken,
    getToken,
};
