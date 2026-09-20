<template>
  <div class="app-container">
    <h1>Game submissions</h1>

    <el-radio-group v-model="verdictFilter" style="margin-bottom: 16px;" @change="getGameSubmissions">
      <el-radio-button value="">All</el-radio-button>
      <el-radio-button value="spam">Spam</el-radio-button>
      <el-radio-button value="uncertain">Needs a look</el-radio-button>
      <el-radio-button value="clean">Clean</el-radio-button>
    </el-radio-group>

    <game-submission-table :loading="loading" :submissions="submissions" />
  </div>
</template>

<script>
import GameSubmissionTable from './gameSubmissionTable.vue'
import { fetchGameSubmissions } from '@/api/games'

export default {
  name: 'GameSubmissions',
  components: {
    GameSubmissionTable
  },
  data() {
    return {
      submissions: [],
      loading: false,
      verdictFilter: ''
    }
  },
  created() {
    this.getGameSubmissions()
  },
  methods: {
    getGameSubmissions() {
      this.loading = true
      const params = {}
      if (this.verdictFilter) {
        params.verdict = this.verdictFilter
      }
      fetchGameSubmissions(params).then(response => {
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
