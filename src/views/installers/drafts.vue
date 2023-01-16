<template>
  <div class="app-container">
    <submission-table
      :loading="draftsLoading"
      :submissions="drafts"
    />
  </div>
</template>

<script>
import SubmissionTable from './submissionTable.vue'
import { fetchDrafts } from '@/api/installers'
export default {
  name: 'Drafts',
  components: { SubmissionTable },
  data() {
    return {
      drafts: null,
      draftsLoading: true
    }
  },
  created() {
    this.getDrafts()
  },
  methods: {
    getDrafts() {
      this.draftsLoading = true
      fetchDrafts().then(response => {
        this.drafts = []
        for (let i = 0; i < response.data.results.length; i++) {
          const draft = response.data.results[i]
          this.drafts.push(draft)
        }
        this.draftsLoading = false
      })
    }
  }
}
</script>
