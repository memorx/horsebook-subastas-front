export const state = () => ({
  isAuthenticated: false,
  singUpData: {},
  setUser: {},
  horseDetails: {},
  userInformation: {},
  websocket: null
})

export const mutations = {
  authenticate(state, value) {
    state.isAuthenticated = value
  },
  setIsUserAbleToBid(state, isAbleToBid) {
    state.isUserAbleToBid = isAbleToBid
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
    state.setUser = ""
    state.setSingUpData = ""
    state.isAuthenticated = false
  },
  setWebSocket(state, socket) {
    state.websocket = socket
  }
}

export const actions = {
  async initializeWebSocket({ commit, state }) {
    // if a WebSocket already exists, don't create a new one.
    // if (state.websocket) return;

    console.log("initializeWebSocket", state);
    // set the user id in the store & set state of
    if (!state.websocket && state.isAuthenticated && state.user.id) {
      console.log("inside initializeWebSocket");
      const url = `${this.$config.baseURLWS}/user-status/${state.user.id}`
      console.log("url", url);
      const socket = await new WebSocket(url)

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log("data", data);
        if (typeof data?.user?.status === "boolean") {
          commit("setIsUserAbleToBid", data.user.status)
        }
      }

      // Store the created websocket instance in the Vuex state
      commit("setWebSocket", socket)
    }
  }
  // ... other actions
}
