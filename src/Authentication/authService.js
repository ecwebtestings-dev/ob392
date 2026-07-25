import {api} from './api';

// Registers a new user, saves the returned token, and returns the user object.
export async function register({name,email,password,password_confirmation}) {
    const data = await api.post('/register',{name,email,password,password_confirmation});
    api.setToken(data.token);
    return data.user;
}

// Logs in with email/password, saves the returned token, and returns the user object.
export async function login({email,password}) {
    const data = await api.post('/login',{email,password});
    api.setToken(data.token);
    return data.user;
}

// Tells the server to revoke the token, then clears it from local storage.
export async function logout() {
    await api.post('/logout');
    api.setToken(null);
}

// Fetches the currently logged-in user .
export async function getCurrentUser() {
    return api.get('/user');
}