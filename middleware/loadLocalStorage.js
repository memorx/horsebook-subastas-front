import { Console } from "console";
import { parse } from "cookieparser";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const storageScopes = {
  signUpData: "singUpData",
  userCredentials: "setUser",
  horseDetail: "horseDetail",
  userInformation: "userInformation"
}

// const DEFAULT_TOKEN = 'bb877c767cdf1b094eccbf000b20ce753c2219fb'
const DEFAULT_TOKEN = '0119158e9e647cc58e9c895fa08316b2a5b03df4'

const retrieveUserInformationOrDefault = (app) => {
  const cookie = app.$cookies.get('access_token');

  if (!cookie){
    return {
      isAuthenticated: false,
      token: DEFAULT_TOKEN
    }
  }

  const decodedObject = jwtDecode(cookie)
  return {
    isAuthenticated: true,
    token: decodedObject.token,
    user: decodedObject.email
  }
}

const setUserInLocalStorage = (setUserObject) => {
  const userInLocalStorage = localStorage.getItem(storageScopes.userCredentials)

  if (!userInLocalStorage){
    localStorage.setItem(storageScopes.userCredentials, setUserObject)
  }
}

export default function ({ app, store }) {
  if (process.client) {
      const storedSingUpData = localStorage.getItem('singUpData');
      if (storedSingUpData) {
          const parsedData = JSON.parse(storedSingUpData);
          console.log('loading singUpData from localStore:', parsedData);
          store.commit('setSingUpData', parsedData);
      }

    const { isAuthenticated, ...authenticatedObject } = retrieveUserInformationOrDefault(app)
    console.log("User Authenticated in Local Storage: ", isAuthenticated)
    store.commit('authenticate', isAuthenticated);
      if (isAuthenticated) {
        console.log("User Authenticated in loadLocalStorage: ", authenticatedObject);
        setUserInLocalStorage(authenticatedObject)
        store.commit('setUser', authenticatedObject);
      }

      const storedHorseDetails = localStorage.getItem('horseDetails');
      if (storedHorseDetails) {
          const parsedHorseDetails = JSON.parse(storedHorseDetails);
          console.log('loading horseDetails from localStore:', parsedHorseDetails);
          store.commit('setHorseDetails', parsedHorseDetails);
      }
      
      const storedUserInformation = localStorage.getItem("userInformation");
      if(storedUserInformation){
        const parsedUserInformation= JSON.parse(storedUserInformation);
        console.log("loading user infor from localStore:", parsedUserInformation);
        store.commit("setUserInformation", parsedUserInformation);
      }
  }
}
