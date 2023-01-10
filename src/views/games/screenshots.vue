<template>
    <div class="app-container">
      <h1>Game screenshots</h1>
      <game-screenshot-table :screenshots="screenshots" />
    </div>
  </template>

  <script>
  import GameScreenshotTable from './gameScreenshotTable.vue'
  import { fetchGameScreenshots } from '@/api/games'

  export default {
    name: 'GameScreenshots',
    components: {
      GameScreenshotTable
    },
    data() {
      return {
        screenshots: []
      }
    },
    created() {
      this.getGameScreenshots()
    },
    methods: {
      getGameScreenshots() {
        fetchGameScreenshots().then(response => {
          this.screenshots = []
          for (let i = 0; i < response.data.results.length; i++) {
            const screenshot = response.data.results[i]
            this.screenshots.push(screenshot)
          }
        })
      }
    }
  }
  </script>
