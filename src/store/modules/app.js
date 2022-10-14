const state = () => ({
  isCollapse: false, // 侧边栏是否收缩展示
  contentFullScreen: false, // 内容是否可全屏展示
  showLogo: true, // 是否显示Logo
  fixedTop: false, // 是否固定顶部, todo，暂未使用
  expandOneMenu: true, // 一次是否只能展开一个菜单
  elementSize: 'small', // element默认尺寸，支持官网四个大小参数
  theme: {
    state: {
      style: 'default',
      primaryColor: '#409eff',
      menuType: 'side'
    }
  }
})

// mutations
const mutations = {
  isCollapseChange(state, type) {
    state.isCollapse = type
  },
  contentFullScreenChange(state, type) {
    state.contentFullScreen = type
  },
  menuListChange(state, arr) {
    state.menuList = arr
  },
  stateChange(state, option) {
    state[option.name] = option.value
  }
}

// actions
const actions = {

}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}