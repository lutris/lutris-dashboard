<template>
  <div class="app-container">
    <h1>Game submissions</h1>
    <game-submission-table :loading="loading" :submissions="submissions" />
  </div>
</template>

<script>
import GameSubmissionTable from './gameSubmissionTable'
import { fetchGameSubmissions } from '@/api/games'

export default {
  name: 'GameSubmissions',
  components: {
    GameSubmissionTable
  },
  data() {
    return {
      submissions: [],
      loading: false
    }
  },
  created() {
    this.getGameSubmissions()
  },
  methods: {
    getGameSubmissions() {
      this.loading = true
      fetchGameSubmissions().then(response => {
        this.submissions = []
        for (let i = 0; i < response.data.results.length; i++) {
          const submission = response.data.results[i]
          this.submissions.push(submission)
        }
        this.loading = false
      })
    }
  }
}
</script>
