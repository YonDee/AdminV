export const state = () => ({
  data: {}
})

export const mutations = {
  Message(state, data) {
    if (typeof data == 'object') {
      state.data = data
    }
  }
}
