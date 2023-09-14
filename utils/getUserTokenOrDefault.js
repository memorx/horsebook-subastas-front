import Cookies from "js-cookie"
import jwtDecode from "jwt-decode";

const DEFAULT_TOKEN = '4b1089cc8bbc1ac6c05eed6448aca3bb5711ab7b'

export default () => {
    const cookie = Cookies.get('access_token');

    if (!cookie) {
        // console.log("Se usa el default token")
        return DEFAULT_TOKEN
    }

    const decoded = jwtDecode(cookie)
    // console.log("Token de usuario en cookie: ", decoded)

    return decoded.token
}