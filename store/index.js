export const state = () => ({
  user: ''
})
export const actions = {
  async nuxtServerInit ({ commit,dispatch },{ req, app, store }) {
    try {
      const { data } = await app.$axios.post('/api/session/verify')
      await commit('setUser', data)
    } catch (error) {
      await commit('setUser', '')
    }
  }
}
export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}
