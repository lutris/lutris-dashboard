<template>
  <div class="app-container">
    <h3>Game statistics</h3>
    <p v-if="!isLoading">
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
  components: {},
  data() {
    return {
      stats: null,
      isLoading: true
    }
  },
  created() {
    this.getStats()
  },
  methods: {
    getStats() {
      this.isLoading = true
      fetchStats().then(response => {
        console.log(response.data)
        this.stats = response.data

        this.isLoading = false
      })
    }
  }
}
</script>
