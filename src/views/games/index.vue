<template>
  <div class="app-container">
    <h1>Games</h1>
    <searchable-game-pane :on-select="redirectToDetails" />
  </div>
</template>

<script>
import SearchableGamePane from '@/components/SearchableGamePane'

export default {
  name: 'GamesDashboard',
  components: { SearchableGamePane },
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
