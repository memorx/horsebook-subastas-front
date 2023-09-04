export const state = () => ({
  isAuthenticated: false,
  singUpData: {},
  setUser: {},
  horseDetails: {},
  userInformation: {}
});

export const mutations = {
  authenticate(state, value) {
    state.isAuthenticated = value;
  },
  setSingUpData(state, value) {
    state.singUpData = value;
    localStorage.setItem('singUpData', JSON.stringify(value));
  },
  setHorseDetails(state, data) {
    state.horseDetails = data
  },
  setUser(state, user) {
    state.user = user;
    localStorage.setItem('setUser', JSON.stringify(user));
  },
  setInformation(state, info) {
    state.info = info;
    localStorage.setItem("setInfo", JSON.stringify(info))
  },
  clearUserData(state) {
    state.setUser = "";
    state.setSingUpData = "";
    localStorage.removeItem("setUser");
  }
};
