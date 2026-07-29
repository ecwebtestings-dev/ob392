import {api} from './api'

// Fetches a paginated list of users.
export function getUsers(page = 1) {
    return api.get(`/users?page=${page}`);
}
// Fetches a single user's details by ID.
export function getUser(id){
    return api.get(`/users/${id}`);
}

// Updates a user's details by ID with the given data.
export function updateUser(id,data){
    return api.post(`/users/update/${id}`,data);
}