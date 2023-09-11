import Cookies from "js-cookie"
import jwtDecode from "jwt-decode";

const DEFAULT_TOKEN = '0119158e9e647cc58e9c895fa08316b2a5b03df4'

export default () => {
    const cookie = Cookies.get('access_token');

    if(!cookie){
        console.log("Se usa el default token")
        return DEFAULT_TOKEN
    }

    const decoded = jwtDecode(cookie)
    console.log("Token de usuario en cookie: ", decoded)

    return decoded.token
}