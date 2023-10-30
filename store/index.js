export const state = () => ({
  isAuthenticated: false,
  singUpData: {},
  setUser: {},
  horseDetails: {},
  userInformation: {},
  bgImage: '',
  textColorTopBar: '',
});

export const mutations = {
  authenticate(state, value) {
    state.isAuthenticated = value;
  },
  setIsUserAbleToBid(state, isAbleToBid) {
    state.isUserAbleToBid = isAbleToBid
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
    state.isAuthenticated = false;
  },
  setBgImage(state, image) {
    state.bgImage = image;
  },
  setTextColorTopBar(state, color) {
    state.textColorTopBar = color;
  },
};
