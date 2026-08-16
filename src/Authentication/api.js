// IMPORT SESSION EVENT EMITTER
import { emitSessionExpired } from "./sessionEvents";

// DEFINE BASE URL FROM ENVIRONMENT VARIABLES
const BASE_URL = import.meta.env.VITE_API_URL;

// FUNCTION TO RETRIEVE AUTH TOKEN FROM LOCAL STORAGE
function getToken() {
    return localStorage.getItem('ob39_token');
}

// FUNCTION TO SET OR REMOVE AUTH TOKEN IN LOCAL STORAGE
function setToken(token) {
    if (token) localStorage.setItem('ob39_token', token);
    else localStorage.removeItem('ob39_token');
}

// CORE ASYNC FUNCTION TO HANDLE ALL HTTP REQUESTS
async function request(path, options = {}) {
    // CHECK IF USER HAD A TOKEN BEFORE THE REQUEST
    const hadToken = Boolean(getToken());

    let res;
    try {
        // ATTEMPT TO FETCH DATA FROM THE API
        res = await fetch(`${BASE_URL}${path}`, {
            // ATTACH DEFAULT HEADERS AND AUTHORIZATION TOKEN IF AVAILABLE
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
                ...options.headers,
            },
            ...options,
        });
    } catch {
        // CATCH NETWORK ERRORS (E.G., NO INTERNET CONNECTION)
        throw new Error('Unable to connect. Please check your internet connection and try again.');
    }

    // HANDLE 401 UNAUTHORIZED RESPONSES (SESSION EXPIRED)
    if (res.status === 401 && hadToken) {
        // CLEAR TOKEN AND EMIT SESSION EXPIRED EVENT
        setToken(null);
        emitSessionExpired('expired');
        
        // THROW CUSTOM ERROR FOR SESSION EXPIRATION
        const err = new Error('Session expired');
        err.isSessionExpired = true;
        throw err;
    }

    // HANDLE OTHER NON-OK HTTP RESPONSES
    if (!res.ok) {
        let message;
        try {
            // ATTEMPT TO PARSE ERROR MESSAGE FROM JSON RESPONSE
            message = (await res.json()).message;
        }
        catch {
            // FALLBACK TO TEXT RESPONSE IF JSON PARSING FAILS
            message = await res.text();
        }
        // THROW ERROR WITH PARSED MESSAGE OR FALLBACK STATUS TEXT
        throw new Error(message || `Error ${res.status}`);
    }

    // RETURN PARSED JSON RESPONSE OR NULL FOR 204 NO CONTENT
    return res.status === 204 ? null : res.json();
}

// EXPORT PUBLIC API SURFACES FOR CONSUMPTION IN COMPONENTS
export const api = {
    // GET REQUEST HELPER
    get: (path) => request(path),
    
    // POST REQUEST HELPER
    post: (path, data) => request(path, { method: 'POST', body: JSON.stringify(data) }),
    
    // PUT REQUEST HELPER
    put: (path, data) => request(path, { method: 'PUT', body: JSON.stringify(data) }),
    
    // PATCH REQUEST HELPER
    patch: (path, data) => request(path, { method: 'PATCH', body: JSON.stringify(data) }),
    
    // DELETE REQUEST HELPER
    delete: (path) => request(path, { method: 'DELETE' }),
    
    // EXPOSE TOKEN UTILITIES
    setToken,
    getToken,
};