import axios from 'axios'
import Cookie from 'js-cookie'
import qs from 'query-string'

export const setCookieWithAxios = async (params) => {
    try {
        await axios.get("http://localhost:8080/cookie", { params: params, withCredentials: true })
    } catch (error) {
        console.log("axios error", error)
    }
}

export const setCookieWithFetch = async (params) => {
    try {
        await fetch(`http://localhost:8080/cookie?${qs.stringify(params)}`, { credentials: "include" })
    } catch (error) {
        console.log("fetch error", error)
    }
}

export const removeCookie = (name) => {
    Cookie.remove(name, { path: window.location.pathname })
}