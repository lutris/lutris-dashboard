<template>
  <header>
    <div class="left-box">
      <div class="menu-icon" @click="opendStateChange">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <div class="theme-toggle" @click="toggleTheme" title="Toggle dark mode">
        <el-icon v-if="isDark"><Sunny /></el-icon>
        <el-icon v-else><Moon /></el-icon>
      </div>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="loginOut">sign out</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { Sunny, Moon } from '@element-plus/icons-vue'
import Breadcrumb from './Breadcrumb.vue'
export default defineComponent({
  components: {
    Breadcrumb,
    Sunny,
    Moon
  },
  setup() {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const { isCollapse } = storeToRefs(appStore)
    const username = computed(() => userStore.info?.username || 'user')
    const isDark = computed(() => appStore.theme.state.style === 'dark')
    const layer = reactive({
      show: false,
      showButton: true
    })
    const opendStateChange = () => {
      appStore.toggleCollapse()
    }
    const toggleTheme = () => {
      appStore.setThemeStyle(isDark.value ? 'default' : 'dark')
    }
    const loginOut = () => {
      userStore.loginOut()
    }
    return {
      isCollapse,
      layer,
      username,
      isDark,
      opendStateChange,
      toggleTheme,
      loginOut
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
}
.left-box {
  height: 100%;
  display: flex;
  align-items: center;
  .menu-icon {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;
    cursor: pointer;
    margin-right: 10px;
    &:hover {
      background-color: var(--system-header-item-hover-color);
    }
    i {
      color: var(--system-header-text-color);
    }
  }
}
.right-box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .function-list {
    display: flex;
    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }
  .theme-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
    color: var(--system-header-text-color);
    &:hover {
      background-color: var(--system-header-item-hover-color);
    }
  }
  .user-info {
    height: 100%;
    display: flex;
    align-items: center;
    margin-left: 20px;
    .el-dropdown-link {
      display: flex;
      align-items: center;
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}
</style>
