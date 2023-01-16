<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="submissions"
    fit
    highlight-current-row>
    <el-table-column label="Comment" prop="comment">
      <template #default="props">
        <a :href="'#/installers/submissions/' + props.row['id']">{{ props.row["version"] }}</a>
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
