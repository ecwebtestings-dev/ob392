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

// Suspends a user's account by ID.
export function suspendUser(id) {
    return api.post(`/users/delete/${id}`);
}

// Restores a suspended user's access by ID.
export function unsuspendUser(id) {
    return api.post(`/user/unsuspend/${id}`);
}

// Grants admin permissions to a user by ID.
export function promoteUser(id) {
    return api.post(`/users/create_admin/${id}`);
}

// Removes admin permissions from a user by ID.
export function demoteUser(id) {
    return api.post(`/users/demote_admin/${id}`);
}