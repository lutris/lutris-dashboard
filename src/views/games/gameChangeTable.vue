<template>
    <el-table
      v-loading="loading"
      key="id"
      :data="changes"
      fit
      highlight-current-row>
      <el-table-column label="Name" prop="game">
        <template #default="props">
          <a :href="'https://lutris.net/games/' + props.row['game'].change_for.slug">{{ props.row["game"].name }}</a>
        </template>
      </el-table-column>
      <el-table-column label="User" prop="user">
        <template #default="props">
          {{ props.row["user"].username }}<br>
          {{ props.row["created_at"] }}<br>
        </template>
      </el-table-column>
    </el-table>
  </template>

  <script>
  export default {
    name: 'GameChangeTable',
    props: {
      loading: {
        type: Boolean,
        default: false
      },
      changes: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      getChangeIndex(changeId) {
        for (let index = 0; index < this.changes.length; index++) {
          if (this.changes[index].id === changeId) {
            return index
          }
        }
      }
    }
  }
  </script>
