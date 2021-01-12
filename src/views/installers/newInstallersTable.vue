<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="newInstallers"
    border
    fit
    highlight-current-row>
    <el-table-column label="Name" prop="name">
      <template slot-scope="scope">
        <a :href="'#/installers/new/' + scope.row['id']">{{ scope.row["name"] }}</a>
      </template>
    </el-table-column>
    <el-table-column label="Author" prop="user" />
    <el-table-column label="Version" prop="version">
      <template slot-scope="scope">
        <a :href="'#/installers/new/' + scope.row['id']">{{ scope.row["version"] }}</a>
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
