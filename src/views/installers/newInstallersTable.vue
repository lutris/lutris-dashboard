<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="newInstallers"
    fit
    highlight-current-row>
    <el-table-column label="Name" prop="name">
      <template #default="props">
        <a :href="'#/installers/new/' + props.row['id']">{{ props.row["name"] }}</a>
      </template>
    </el-table-column>
    <el-table-column label="Author" prop="user" />
    <el-table-column label="Updated at" prop="updated_at" />
    <el-table-column label="Version" prop="version">
      <template #default="props">
        <a :href="'#/installers/new/' + props.row['id']">{{ props.row["version"] }}</a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  name: 'NewInstallerTable',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    newInstallers: {
      type: Array,
      default: () => []
    }
  }
}
</script>
