<template>
  <el-table
    v-loading="loading"
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

export default {
  name: 'SubmissionTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    submissions: {
      type: Array,
      default: () => []
    }
  }
}
</script>
