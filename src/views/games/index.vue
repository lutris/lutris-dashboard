<template>
  <div class="app-container">
    <h1>Games</h1>
    <game-search-input :on-select="redirectToDetails" />
  </div>
</template>

<script>
import GameSearchInput from '@/components/GameSearchInput/index.vue'

export default {
  name: 'GamesDashboard',
  components: { GameSearchInput },
  props: {
    game: {
      type: Object,
      default: null
    }
  },
  methods: {
    redirectToDetails(slug) {
      this.$router.push({ path: '/games/' + slug })
    }
  }
}
</script>
