import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (username, email, password) => {
    const {data} = await $host.post('api/user/register', {username, email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (username, email, password) => {
    const {data} = await $host.post('api/user/login', {username, email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
