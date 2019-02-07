<template>
  <div class="dashboard-editor-container">
    <div class="clearfix">
      <div class="info-container">
        <span class="display_name">{{ name }}</span>
        <span>Moderation Dashboard</span>
      </div>
    </div>
    <div>
      <span>Content here</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DashboardEditor',
  components: { },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;

    .info-container {
      .display_name {
        font-size: 2em;
        color: #212121;
      }
    }
  }
</style>
