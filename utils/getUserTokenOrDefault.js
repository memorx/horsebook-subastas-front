import Cookies from "js-cookie"
import jwtDecode from "jwt-decode";

export default () => {
    const cookie = Cookies.get('access_token');

    if (!cookie) {
        // console.log("Se usa el default token")
        return this.$config.apiToken
    }

    const decoded = jwtDecode(cookie)
    // console.log("Token de usuario en cookie: ", decoded)

    return decoded.token
}