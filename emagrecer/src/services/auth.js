var authorize = false;
export const TOKEN_KEY = "@authorization-token-emagrecer";
export function isAuthenticated() {
    authorize = localStorage.getItem(TOKEN_KEY) !== undefined && localStorage.getItem(TOKEN_KEY) !== null && localStorage.getItem(TOKEN_KEY) !== '';
    return authorize;
}

export var getToken = localStorage.getItem(TOKEN_KEY);
export function login(token) {
    localStorage.setItem(TOKEN_KEY, token);
};
export function logout() {
    localStorage.removeItem(TOKEN_KEY);
};
export function setId(id) {
    localStorage.setItem("@Id-user-logged-in", id);
}
export function getId() {
    return localStorage.getItem("@Id-user-logged-in");
}