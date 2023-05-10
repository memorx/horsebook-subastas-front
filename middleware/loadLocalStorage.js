export default function ({ store }) {
  if (process.client) {
      const storedSingUpData = localStorage.getItem('singUpData');
      if (storedSingUpData) {
          const parsedData = JSON.parse(storedSingUpData);
          console.log('loading singUpData from localStore:', parsedData);
          store.commit('setSingUpData', parsedData);
      }

      const storedUser = localStorage.getItem('setUser');
      if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          console.log('loading user from localStore:', parsedUser);
          store.commit('setUser', parsedUser);
      }

      const storedHorseDetails = localStorage.getItem('horseDetails');
      if (storedHorseDetails) {
          const parsedHorseDetails = JSON.parse(storedHorseDetails);
          console.log('loading horseDetails from localStore:', parsedHorseDetails);
          store.commit('setHorseDetails', parsedHorseDetails);
      }
      const storedUserInformation=localStorage.getItem("userInformation");
      if(storedUserInformation){
        const parsedUserInformation= JSON.parse(storedUserInformation);
        console.log("loading user infor from localStore:", parsedUserInformation);
        store.commit("setUserInformation", parsedUserInformation);
      }
  }
}
