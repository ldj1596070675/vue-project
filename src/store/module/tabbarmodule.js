const module = {
  namespaced: true,
  state: {
    isTabbarShow: true // 定义tabber的显示状态
  },
  mutations: {
    show (state) {
      state.isTabbarShow = true
    },
    hide (state) {
      state.isTabbarShow = false
    }
  }
}
export default module
