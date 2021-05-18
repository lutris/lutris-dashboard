<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="submissions"
    border
    fit
    highlight-current-row>
    <el-table-column label="Banner" prop="game">
      <template slot-scope="scope">
        <img :src="scope.row['game'].banner_url">
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="game">
      <template slot-scope="scope">
        <a :href="'#/games/' + scope.row['game'].slug">{{ scope.row["game"].name }}</a>
      </template>
    </el-table-column>
    <el-table-column label="User" prop="user">
      <template slot-scope="scope">
        {{ scope.row["user"].username }}<br>
        {{ scope.row["created_at"] }}<br>
      </template>
    </el-table-column>
    <el-table-column label="Actions" prop="id">
      <template slot-scope="scope">
        <el-button type="warning" @click="acceptSubmission(scope.row['id'])">Accept</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { sendSubmissionAccept } from '@/api/games'

export default {
  name: 'GameSubmissionTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    submissions: {
      type: Array,
      default: () => []
    }
  },
  methods: {

    getSubmissionIndex(submissionId) {
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].id === submissionId) {
          return index
        }
      }
    },

    acceptSubmission(submissionId) {
      sendSubmissionAccept(submissionId).then(response => {
        console.log(response.data)
        if (response.data.accepted) {
          this.submissions.splice(this.getSubmissionIndex(submissionId), 1)
        }
      })
    }
  }
}
</script>
