<template>
  <div class="app-container">
    <submission-table
      :submissions-loading="submissionsLoading"
      :submissions="submissions" />
  </div>
</template>

<script>
import SubmissionTable from './submissionTable'
import { fetchSubmissions } from '@/api/installers'
export default {
  name: 'Submissions',
  components: { SubmissionTable },
  data() {
    return {
      submissions: null,
      submissionsLoading: false
    }
  },
  created() {
    this.getSubmissions()
  },
  methods: {
    getSubmissions() {
      this.submissionsLoading = true
      fetchSubmissions().then(response => {
        this.submissions = []
        for (let i = 0; i < response.data.results.length; i++) {
          const submission = response.data.results[i]
          if (submission.version_set.length === 0) {
            continue
          }
          this.submissions.push(submission)
        }
        this.submissionsLoading = false
      })
    }
  }
}
</script>
