<template>
    <div class="app-container">
      <h1>Game changes</h1>
      <game-change-table :loading="loading" :changes="changes" />
    </div>
  </template>

  <script>
  import GameChangeTable from './gameChangeTable.vue'
  import { fetchGameChanges } from '@/api/games'

  export default {
    name: 'GameChanges',
    components: {
        GameChangeTable
    },
    data() {
      return {
        changes: [],
        loading: false
      }
    },
    created() {
      this.getGameChanges()
    },
    methods: {
      getGameChanges() {
        this.loading = true
        fetchGameChanges().then(response => {
          this.changes = []
          for (let i = 0; i < response.data.results.length; i++) {
            const change = response.data.results[i]
            this.changes.push(change)
          }
          this.loading = false
        })
      }
    }
  }
  </script>