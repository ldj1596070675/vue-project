const module = {
  namespaced: true,
  state: {
    cityName: '北京',
    cityId: '110100'
  },
  mutations: {
    setCityName (state, name) {
      state.cityName = name
    },
    setCityId (state, cityId) {
      state.cityId = cityId
    }
  }
}
export default module
