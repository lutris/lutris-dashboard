<template>
  <div class="app-container">
    <p>Total submissions: {{ totalSubmissions }}
      |
      <a v-if="previousURL" href="#" @click="onPreviousClick">Previous</a>
      <a v-if="nextURL" href="#" @click="onNextClick">Next</a>
      |
      <a v-if="order=='newest'" href="#" @click="onSortBy('oldest')">Sort by oldest</a>
      <a v-if="order=='oldest'" href="#" @click="onSortBy('newest')">Sort by newest</a>
    </p>
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
      submissionsLoading: false,
      totalSubmissions: 0,
      currentURL: localStorage.getItem('installerCurrentURL'),
      nextURL: null,
      previousURL: null,
      order: localStorage.getItem('installerSortOrder') || 'newest'
    }
  },
  created() {
    this.getSubmissions(this.currentURL)
  },
  methods: {
    getSubmissions(url) {
      this.submissionsLoading = true
      fetchSubmissions(url, this.order).then(response => {
        this.submissions = []
        this.totalSubmissions = response.data.count
        this.nextURL = response.data.next
        this.previousURL = response.data.previous
        console.log(response.data.results.length)
        for (let i = 0; i < response.data.results.length; i++) {
          const submission = response.data.results[i]
          if (submission.version_set.length === 0) {
            continue
          }
          this.submissions.push(submission)
        }
        this.submissionsLoading = false
      })
    },
    onPreviousClick() {
      localStorage.setItem('installerCurrentURL', this.previousURL)
      this.getSubmissions(this.previousURL)
    },
    onNextClick() {
      localStorage.setItem('installerCurrentURL', this.nextURL)
      this.getSubmissions(this.nextURL)
    },
    onSortBy(order) {
      this.order = order
      localStorage.setItem('installerSortOrder', this.order)
      this.getSubmissions()
    }
  }
}
</script>
