import JWTDecode from "jwt-decode"
import Cookie from "js-cookie"

export const state = () => ({
  isAuthenticated: false,
  : false,
  singUpData: {},
  setUser: {},
  horseDetails: {},
  userInformation: {},
  bgImage: '',
  textColorTopBar: '',
  websocket: null,
  scrollIntoContact: false,
  layoutMode: 'default',
});

export const mutations = {
  authenticate(state, value) {
    state.isAuthenticated = value
  },
  set(state, isAbleToBid) {
    if(state. != isAbleToBid) {
      state. = isAbleToBid
      localStorage.setItem("", isAbleToBid)
    }
  },
  setSingUpData(state, value) {
    state.singUpData = value
    localStorage.setItem("singUpData", JSON.stringify(value))
  },
  setHorseDetails(state, data) {
    state.horseDetails = data
  },
  setUser(state, user) {
    state.user = user
    localStorage.setItem("setUser", JSON.stringify(user))
  },
  setInformation(state, info) {
    state.info = info
    localStorage.setItem("setInfo", JSON.stringify(info))
  },
  clearUserData(state) {
    state.setUser = "";
    state.setSingUpData = "";
    state.isAuthenticated = false;
  },
  setBgImage(state, image) {
    state.bgImage = image;
  },
  setTextColorTopBar(state, color) {
    state.textColorTopBar = color;
  },
  setWebSocket(state, socket) {
    state.websocket = socket
  },
  closeWebSocket(state) {
    if (state.websocket) {
      state.websocket.close()
      state.websocket = null
    }
  },
  setScrollIntoContact(state, value) {
    state.scrollIntoContact = value
  },
  setLayoutMode(state, mode) {
    state.layoutMode = mode;
  },
};

export const actions = {
  async initializeWebSocketUserStatus({ commit, state }) {
    // set the user id in the store & set state of
    if (!state.websocket && state.isAuthenticated && state.user.id) {
      // console.log("websocket inside")
      const url = `${this.$config.baseURLWS}/user-status/${state.user.id}`
      const socket = await new WebSocket(url)

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        // console.log("data", data)
        if (typeof data?.user?.status === "boolean") {
          // update the cookie
          const decoded = JWTDecode(this.$cookies.get("access_token"))
          const HMACSHA256 = (stringToSign, secret) => {
            const crypto = require("crypto")
            return crypto
              .createHmac("sha256", secret)
              .update(stringToSign)
              .digest("base64")
          }
          const header = {
            alg: "HS256",
            typ: "JWT"
          }
          const encodedHeaders = btoa(JSON.stringify(header))
          const claims = {
            email: decoded.email,
            token: decoded.token,
            id: decoded.id,
            isAbleToBid: data.user.status
          }
          const encodedPlayload = btoa(JSON.stringify(claims))
          const signature = HMACSHA256(
            `${encodedHeaders}.${encodedPlayload}`,
            "mysecret"
          )
          const encodedSignature = btoa(signature)
          const jwt = `${encodedHeaders}.${encodedPlayload}.${encodedSignature}`
          Cookie.set("access_token", jwt)

          // update the store
          commit("set", data.user.status)
          // console.log("data.user.status", data.user.status);
        }
      }

      // Store the created websocket instance in the Vuex state
      commit("setWebSocket", socket)
    }
  },
  scrollIntoContact({ commit }, value) {
    commit("setScrollIntoContact", value)
  }
  // ... other actions
}
