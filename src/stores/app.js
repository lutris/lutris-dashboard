import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    isCollapse: false,
    contentFullScreen: false,
    showLogo: true,
    fixedTop: false,
    expandOneMenu: true,
    elementSize: 'small',
    theme: {
      state: {
        style: 'default',
        primaryColor: '#409eff',
        menuType: 'side'
      }
    }
  }),
  actions: {
    setCollapse(value) {
      this.isCollapse = value
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    setContentFullScreen(value) {
      this.contentFullScreen = value
    },
    setThemeStyle(styleName) {
      this.theme.state.style = styleName
      import('@/theme/index.js').then(({ applyTheme }) => applyTheme(styleName))
    },
    initTheme() {
      import('@/theme/index.js').then(({ applyTheme }) => applyTheme(this.theme.state.style))
    }
  },
  persist: true
})
