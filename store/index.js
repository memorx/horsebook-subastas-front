export const state = () => ({
    singUpData: {}
});

export const mutations = {
    setSingUpData(state, value) {
        state.singUpData = value;
        localStorage.setItem('singUpData', JSON.stringify(value));
    },
};
