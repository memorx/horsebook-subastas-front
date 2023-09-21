import Cookies from "js-cookie"
import jwtDecode from "jwt-decode";
import { context } from "@nuxt/vue-app"

export default () => {
    const cookie = Cookies.get('access_token');

    if (!cookie) {
        // console.log("Se usa el default token")
        // return '0119158e9e647cc58e9c895fa08316b2a5b03df4'
        return process.env.API_TOKEN
    }

    const decoded = jwtDecode(cookie)
    // console.log("Token de usuario en cookie: ", decoded)

    return decoded.token
}