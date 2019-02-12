<template>
  <span>{{ submission.id }}</span>
</template>

<script>
import { fetchSubmission } from '@/api/installers'
export default {
  name: 'SubmissionDetail',
  data() {
    return {
      submission: null,
      submissionLoading: false
    }
  },
  created() {
    this.getSubmission()
  },
  methods: {
    getSubmission() {
      const id = this.$route.params && this.$route.params.id
      this.submissionLoading = true
      fetchSubmission(id).then(response => {
        this.submission = response.data
        this.submissionsLoading = false
      })
    }
  }
}
</script>
