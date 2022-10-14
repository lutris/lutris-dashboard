<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="submissions"
    fit
    highlight-current-row>
    <el-table-column label="Banner" prop="game">
      <template #default="props">
        <img :src="props.row['game'].banner_url">
      </template>
    </el-table-column>
    <el-table-column label="Name" prop="game">
      <template #default="props">
        <a :href="'#/games/' + props.row['game'].slug">{{ props.row["game"].name }}</a>
      </template>
    </el-table-column>
    <el-table-column label="User" prop="user">
      <template #default="props">
        {{ props.row["user"].username }}<br>
        {{ props.row["created_at"] }}<br>
      </template>
    </el-table-column>
    <el-table-column label="Actions" prop="id">
      <template #default="props">
        <el-button type="warning" @click="acceptSubmission(props.row['id'])">Accept</el-button>
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
