<template>
  <div class="app-container">
    <h1>Regressions</h1>

    <el-radio-group v-model="statusFilter" style="margin-bottom: 16px;" @change="loadRegressions">
      <el-radio-button value="">All</el-radio-button>
      <el-radio-button value="pending">Pending</el-radio-button>
      <el-radio-button value="accepted">Accepted</el-radio-button>
      <el-radio-button value="rejected">Rejected</el-radio-button>
      <el-radio-button value="resolved">Resolved</el-radio-button>
    </el-radio-group>

    <el-table
      v-loading="loading"
      key="id"
      :data="regressions"
      fit
      highlight-current-row>
      <el-table-column label="Title" min-width="250">
        <template #default="{ row }">
          <router-link :to="'/regressions/' + row.id" class="regression-link">
            {{ row.title }}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Status" width="130">
        <template #default="{ row }">
          <el-tag :type="statusTagType(row.status)" size="small">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Wine Version" width="180" prop="last_known_working_version" />
      <el-table-column label="Games" width="100" align="center">
        <template #default="{ row }">
          {{ row.games.length }}
        </template>
      </el-table-column>
      <el-table-column label="Submitted by" width="140" prop="submitted_by" />
      <el-table-column label="Date" width="120">
        <template #default="{ row }">
          <span class="date-cell" :title="row.created_at">{{ formatDate(row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Actions" width="260" align="center">
        <template #default="{ row }">
          <template v-if="row.status === 'pending'">
            <el-button type="success" size="small" @click="onAccept(row)">Accept</el-button>
            <el-button type="danger" size="small" @click="onReject(row)">Reject</el-button>
          </template>
          <template v-else-if="row.status === 'accepted'">
            <el-button type="warning" size="small" @click="onResolve(row)">Resolve</el-button>
            <el-button type="danger" size="small" @click="onReject(row)">Reject</el-button>
          </template>
          <template v-else-if="row.status === 'rejected'">
            <el-button type="success" size="small" @click="onAccept(row)">Accept</el-button>
          </template>
          <template v-else-if="row.status === 'resolved'">
            <el-button type="success" size="small" @click="onAccept(row)">Reopen</el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fetchRegressions, updateRegression } from '@/api/regressions'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export default {
  name: 'RegressionList',
  data() {
    return {
      regressions: [],
      loading: false,
      statusFilter: 'pending'
    }
  },
  created() {
    this.loadRegressions()
  },
  methods: {
    loadRegressions() {
      this.loading = true
      const params = {}
      if (this.statusFilter) {
        params.status = this.statusFilter
      }
      fetchRegressions(params).then(response => {
        this.regressions = response.data.results
        this.loading = false
      })
    },

    formatDate(dateStr) {
      if (!dateStr) return ''
      return dayjs(dateStr).fromNow()
    },

    statusTagType(status) {
      switch (status) {
        case 'pending': return 'warning'
        case 'accepted': return 'success'
        case 'rejected': return 'danger'
        case 'resolved': return 'info'
        default: return ''
      }
    },

    onAccept(row) {
      updateRegression(row.id, { status: 'accepted' }).then(response => {
        Object.assign(row, response.data)
      })
    },

    onReject(row) {
      updateRegression(row.id, { status: 'rejected' }).then(response => {
        Object.assign(row, response.data)
      })
    },

    onResolve(row) {
      updateRegression(row.id, { status: 'resolved' }).then(response => {
        Object.assign(row, response.data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.regression-link {
  color: var(--system-primary-color);
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
}

.date-cell {
  font-size: 12px;
  color: var(--system-page-tip-color);
}
</style>
