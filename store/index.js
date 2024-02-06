export const state = () => ({
  requestData: [],
})

export const mutations = {
  setMyData(state, newData) {
    state.requestData = newData
  },
}
