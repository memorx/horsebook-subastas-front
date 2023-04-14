//
export default function ({ store }) {
    if (process.client) {
        const storedSingUpData = localStorage.getItem('singUpData');
        if (storedSingUpData) {
            const parsedData = JSON.parse(storedSingUpData);
            console.log('loading singUpData from localStore:', parsedData);
            store.commit('setSingUpData', parsedData);
        }
    }
}
