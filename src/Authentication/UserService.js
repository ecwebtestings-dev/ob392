import {api} from './api'

// Fetches the full list of users (likely admin-only on the server).
export function getUsers(){
    return api.get('/users');
}

// Fetches a single user's details by ID.
export function getUser(id){
    return api.get(`/users/${id}`);
}

// Updates a user's details by ID with the given data.
export function updateUser(id,data){
    return api.post(`/users/update/${id}`,data);
}