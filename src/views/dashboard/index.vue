<template>
  <div class="dashboard-container">
    <div class="info-container">
      <p>Games: {{ stats.games }}</p>
      <p>Unpublished games: {{ stats.unpublished_games }}</p>
      <p>Installers : {{ stats.installers }}</p>
      <p>Unpublished installers: {{ stats.unpublished_installers }}</p>
      <p>Screenshots : {{ stats.screenshots }}</p>
      <p>Unpublished screenshots: {{ stats.unpublished_screenshots }}</p>
    </div>
  </div>
</template>

<script>
import { fetchStats } from '@/api/installers'
export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      statsLoading: false,
      stats: {
        'games': 0,
        'unpublished_games': 0,
        'published_games': 0,
        'installers': 0,
        'unpublished_installers': 0,
        'screenshots': 0,
        'unpublished_screenshots': 0
      }
    }
  },
  computed: {},
  created() {
    this.getStats()
  },
  methods: {
    getStats() {
      this.statsLoading = true
      fetchStats().then(response => {
        this.stats = response.data
        this.statsLoading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
    padding: 50px 60px 0px;

    .info-container {
      font-size: 2em;
      color: #414141;
    }
  }
</style>
