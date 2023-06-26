export const state = () => ({
  singUpData: {},
  setUser: {},
  horseDetails: {},
  userInformation: {}
});

export const mutations = {
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
    state.setUser = {};
    localStorage.removeItem("setUser")
  }
};
