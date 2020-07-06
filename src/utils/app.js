import Cookie from "cookie_js";


export function getToken() {

    return Cookie.get("admin_toKen")
}

export function setToken(token) {
    Cookie.set("admin_toKen", token)
}
export function removeToken() {
    Cookie.remove("admin_toKen")
}

export function setUserName(value) {
    Cookie.set("username", value)
}

export function getUserName() {
    return Cookie.get("username")
}

export function removeUserName() {
    Cookie.remove("username")
}
