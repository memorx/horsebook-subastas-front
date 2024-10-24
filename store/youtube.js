export const state = () => ({
  isMinimized: false,
  currentPage: '',
  originPage: '',
  videoId: ''
})

export const mutations = {
  SET_MINIMIZED(state, value) {
    state.isMinimized = value
    localStorage.setItem('youtube_minimized', value)
  },
  SET_PAGES(state, current) {
    if (!state.originPage) {
      state.originPage = current
      localStorage.setItem('youtube_origin_page', current)
    }
    state.currentPage = current
    localStorage.setItem('youtube_current_page', current)
  },
  SET_VIDEO_ID(state, id) {
    state.videoId = id
    localStorage.setItem('youtube_video_id', id)
  },
  RESET_STATE(state) {
    state.isMinimized = false
    state.originPage = ''
    state.currentPage = ''
    state.videoId = ''
    localStorage.removeItem('youtube_minimized')
    localStorage.removeItem('youtube_origin_page')
    localStorage.removeItem('youtube_current_page')
    localStorage.removeItem('youtube_video_id')
  },
  RESTORE_STATE(state) {
    state.isMinimized = localStorage.getItem('youtube_minimized') === 'true'
    state.originPage = localStorage.getItem('youtube_origin_page') || ''
    state.currentPage = localStorage.getItem('youtube_current_page') || ''
    state.videoId = localStorage.getItem('youtube_video_id') || ''
  }
}