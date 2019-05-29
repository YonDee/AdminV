export const state = () => ({
  user: ''
})
export const actions = {
  async nuxtServerInit ({ commit,dispatch },{ req, app, store }) {
    try {
      const { data } = await app.$axios.post('http://127.0.0.1:3000/api/session/verify')
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
