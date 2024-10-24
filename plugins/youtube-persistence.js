export default ({ store }) => {
  if (process.client) {
    window.onNuxtReady(() => {
      store.commit('youtube/RESTORE_STATE')
    })
  }
}
