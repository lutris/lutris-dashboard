<template>
  <div class="app-container" v-loading="loading">
    <template v-if="regression">
      <div class="header">
        <h1>{{ regression.title }}</h1>
        <el-tag :type="statusTagType(regression.status)" size="large">
          {{ regression.status }}
        </el-tag>
      </div>

      <el-descriptions :column="2" border style="margin-bottom: 20px;">
        <el-descriptions-item label="Submitted by">{{ regression.submitted_by }}</el-descriptions-item>
        <el-descriptions-item label="Reviewed by">{{ regression.reviewed_by || '—' }}</el-descriptions-item>
        <el-descriptions-item label="Wine Version">{{ regression.last_known_working_version }}</el-descriptions-item>
        <el-descriptions-item label="Bug Status">{{ regression.bug_status || '—' }}</el-descriptions-item>
        <el-descriptions-item label="Created">{{ formatDate(regression.created_at) }}</el-descriptions-item>
        <el-descriptions-item label="Updated">{{ formatDate(regression.updated_at) }}</el-descriptions-item>
        <el-descriptions-item v-if="regression.resolved_at" label="Resolved">{{ formatDate(regression.resolved_at) }}</el-descriptions-item>
        <el-descriptions-item v-if="regression.bug_url" label="Bug URL" :span="2">
          <a :href="regression.bug_url" target="_blank" class="bug-link">{{ regression.bug_url }}</a>
        </el-descriptions-item>
      </el-descriptions>

      <div v-if="regression.description" class="description">
        <h3>Description</h3>
        <p>{{ regression.description }}</p>
      </div>

      <div class="section">
        <h3>Affected Games ({{ regression.games.length }})</h3>
        <el-table :data="regression.games" fit size="small" v-if="regression.games.length">
          <el-table-column label="Name" min-width="200">
            <template #default="{ row }">
              <router-link :to="'/games/' + row.slug" class="game-link">{{ row.name }}</router-link>
            </template>
          </el-table-column>
          <el-table-column label="Slug" width="200" prop="slug" />
        </el-table>
        <p v-else class="text-muted">No games linked yet.</p>
      </div>

      <el-divider />

      <h3>Edit</h3>
      <el-form label-width="180px" style="max-width: 700px;">
        <el-form-item label="Title">
          <el-input v-model="editForm.title" />
        </el-form-item>
        <el-form-item label="Description">
          <el-input v-model="editForm.description" type="textarea" :rows="4" />
        </el-form-item>
        <el-form-item label="Bug URL">
          <el-input v-model="editForm.bug_url" />
        </el-form-item>
        <el-form-item label="Bug Status">
          <el-input v-model="editForm.bug_status" placeholder="e.g. open, fixed, wontfix" />
        </el-form-item>
        <el-form-item label="Wine Version">
          <el-input v-model="editForm.last_known_working_version" />
        </el-form-item>
        <el-form-item label="Status">
          <el-select v-model="editForm.status">
            <el-option value="pending" label="Pending" />
            <el-option value="accepted" label="Accepted" />
            <el-option value="rejected" label="Rejected" />
            <el-option value="resolved" label="Resolved" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSave" :loading="saving">Save</el-button>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>

<script>
import { fetchRegression, updateRegression } from '@/api/regressions'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'

export default {
  name: 'RegressionDetail',
  data() {
    return {
      regression: null,
      loading: false,
      saving: false,
      editForm: {
        title: '',
        description: '',
        bug_url: '',
        bug_status: '',
        last_known_working_version: '',
        status: ''
      }
    }
  },
  created() {
    this.loadRegression()
  },
  methods: {
    loadRegression() {
      this.loading = true
      fetchRegression(this.$route.params.id).then(response => {
        this.regression = response.data
        this.editForm = {
          title: this.regression.title,
          description: this.regression.description,
          bug_url: this.regression.bug_url,
          bug_status: this.regression.bug_status,
          last_known_working_version: this.regression.last_known_working_version,
          status: this.regression.status
        }
        this.loading = false
      })
    },

    formatDate(dateStr) {
      if (!dateStr) return ''
      return dayjs(dateStr).format('YYYY-MM-DD HH:mm')
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

    onSave() {
      this.saving = true
      updateRegression(this.regression.id, this.editForm).then(response => {
        this.regression = response.data
        ElMessage.success('Regression updated')
        this.saving = false
      }).catch(() => {
        this.saving = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;

  h1 {
    margin: 0;
  }
}

.description {
  margin-bottom: 20px;

  p {
    white-space: pre-wrap;
  }
}

.section {
  margin-bottom: 20px;
}

.game-link {
  color: var(--system-primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.bug-link {
  color: var(--system-primary-color);
  word-break: break-all;
}

.text-muted {
  color: var(--system-page-tip-color);
}
</style>
