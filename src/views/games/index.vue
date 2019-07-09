<template>
  <div class="app-container">
    <h3>Game statistics</h3>
    <p v-if="stats">
      <strong>Pending submissions: </strong>
      <span>{{ stats.num_installer_submissions }}</span>
    </p>
    <p>
      <strong>Games:</strong>
      <span>{{ stats.num_published_games }} published, {{ stats.num_games }} total</span>
    </p>
  </div>
</template>

<script>
import { fetchStats } from '@/api/installers'
export default {
  name: 'GamesDashboard',
  data() {
    return {
      stats: () => null
    }
  },
  created() {
    this.getStats()
  },
  methods: {
    getStats() {
      fetchStats().then(response => {
        this.stats = response.data
      })
    }
  }
}
</script>
