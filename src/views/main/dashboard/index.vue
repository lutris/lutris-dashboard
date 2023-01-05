<template>
  <div class="box">
    <div class="info-container">
      <p>Games: {{ stats.games }}</p>
      <p>Published games: {{ stats.published_games }}</p>
      <p>Unpublished games: {{ stats.unpublished_games }}</p>
      <hr/>

      <p>Submissions: {{ stats.game_submissions }}</p>
      <p>Accepted submissions: {{ stats.accepted_game_submissions }}</p>
      <p>Pending submissions: <a href="/#/games/game_submissions">{{ stats.pending_game_submissions }}</a></p>
      <hr/>

      <p>Installers : {{ stats.installers }}</p>
      <p>Published installers: {{ stats.published_installers }}</p>
      <p>Unpublished installers: {{ stats.unpublished_installers }}</p>
      <p>Draft installers: {{ stats.drafts }}</p>
      <hr/>

      <p>Screenshots : {{ stats.screenshots }}</p>
      <p>Published screenshots: {{ stats.published_screenshots }}</p>
      <p>Unpublished screenshots: {{ stats.unpublished_screenshots }}</p>
    </div>
  </div>
</template>

<script>
import { fetchStats } from '@/api/games'

export default {
  name: 'Dashboard',
  components: {},
  data() {
    return {
      statsLoading: false,
      stats: {
        'games': 0,
        'published_games': 0,
        'unpublished_games': 0,
        'game_submissions': 0,
        'accepted_game_submissions': 0,
        'pending_game_submissions': 0,
        'installers': 0,
        'published_installers': 0,
        'unpublished_installers': 0,
        'drafts': 0,
        'screenshots': 0,
        'published_screenshots': 0,
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

<style lang="scss" scoped>
  .box {
    padding: 15px;
  }
</style>