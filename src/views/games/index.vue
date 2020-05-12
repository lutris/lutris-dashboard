<template>
  <div class="app-container">
    <h1>Games</h1>
    <searchable-game-pane />
  </div>
</template>

<script>
import SearchableGamePane from '@/components/SearchableGamePane'

export default {
  name: 'GamesDashboard',
  components: { SearchableGamePane },
  data() {
    return { game: null }
  }
}
</script>
