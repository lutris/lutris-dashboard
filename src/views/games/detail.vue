<template>
  <div v-if="game" class="app-container">
    <game-card :game="game" />
  </div>
</template>

<script>
import GameCard from '@/components/GameCard/index.vue'
import { getGame } from '@/api/games'

export default {
  name: 'GamesDashboard',
  components: { GameCard },
  data() {
    return { game: null }
  },
  created() {
    getGame(this.$route.params.slug).then(response => {
      this.game = response.data
    })
  }
}
</script>
