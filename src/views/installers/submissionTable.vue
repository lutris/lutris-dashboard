<template>
  <el-table
    v-loading="submissionsLoading"
    key="id"
    :data="submissions"
    border
    fit
    highlight-current-row>
    <el-table-column label="Comment" prop="comment">
      <template slot-scope="scope">
        <a :href="'#/installers/submissions/' + scope.row['id']">{{ scope.row["comment"] }}</a>
      </template>

    </el-table-column>
  </el-table>
</template>

<script>
import { fetchSubmissions } from '@/api/installers'
export default {
  name: 'SubmissionTable',
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
