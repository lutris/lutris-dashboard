<template>
  <el-table
    v-loading="loading"
    key="id"
    :data="submissions"
    fit
    highlight-current-row
    class="game-submission-table">
    <el-table-column label="Game" min-width="360">
      <template #default="{ row }">
        <div class="game-cell">
          <div class="banner-wrapper">
            <img
              v-if="row.game?.banner_url"
              :src="row.game.banner_url"
              class="game-banner"
              alt=""
              @error="$event.target.style.display='none'">
            <div class="game-banner game-banner--placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </div>
          <div class="game-info">
            <router-link :to="'/games/' + row.game?.slug" class="game-name">
              {{ row.game?.name }}
            </router-link>
            <span class="game-meta">
              <span class="game-slug">{{ row.game?.slug }}</span>
              <span v-if="row.game?.year">{{ row.game.year }}</span>
              <span v-if="row.game?.website" class="game-website" :title="row.game.website">
                <el-icon><Link /></el-icon>{{ websiteHost(row.game.website) }}
                <el-tag v-if="isKnownSpamDomain(row)" type="danger" size="small" effect="plain">
                  seen in spam
                </el-tag>
              </span>
              <span :title="platformNames(row).join(', ')">
                {{ platformSummary(row) }}
              </span>
            </span>
            <span v-if="row.game?.description" class="game-description" :title="row.game.description">
              {{ row.game.description }}
            </span>
            <span v-if="row.reason" class="game-reason" :title="row.reason">
              Reason: {{ row.reason }}
            </span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Submitted by" width="180">
      <template #default="{ row }">
        <div class="user-cell">
          <span class="user-name">{{ row.user?.username }}</span>
          <span class="user-meta" :title="row.user?.email">{{ row.user?.email }}</span>
          <span class="user-meta">
            {{ row.library_game_count === null ? '' : row.library_game_count + ' games in library' }}
          </span>
          <span v-if="row.ip_address" class="user-meta">{{ row.ip_address }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Spam check" width="230">
      <template #default="{ row }">
        <div v-if="row.spam_assessment" class="spam-cell">
          <el-tooltip
            :disabled="!matchedRules(row).length"
            placement="left"
            :content="matchedRules(row).join(', ')">
            <el-tag :type="verdictTagType(row.spam_assessment.verdict)" size="small">
              {{ verdictLabel(row.spam_assessment.verdict) }} &middot; {{ row.spam_assessment.score }}
            </el-tag>
          </el-tooltip>
          <span v-if="matchedRules(row).length" class="spam-rules">
            {{ matchedRules(row).slice(0, 2).join(', ') }}
            <template v-if="matchedRules(row).length > 2">
              +{{ matchedRules(row).length - 2 }}
            </template>
          </span>
        </div>
        <span v-else class="spam-unavailable">&mdash;</span>
      </template>
    </el-table-column>
    <el-table-column label="Date" width="120">
      <template #default="{ row }">
        <span class="date-cell" :title="row.created_at">{{ formatDate(row.created_at) }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Actions" width="230" align="center">
      <template #default="{ row }">
        <div class="actions-cell">
          <el-button type="success" size="small" @click="acceptSubmission(row.id)">Accept</el-button>
          <el-button type="danger" size="small" @click="rejectSubmission(row.id)">Reject</el-button>
          <el-button
            type="danger"
            size="small"
            plain
            :disabled="row.user?.is_staff"
            @click="rejectAndBanSubmission(row)">
            Reject &amp; ban
          </el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { sendSubmissionAccept, sendSubmissionReject, sendSubmissionRejectAndBan } from '@/api/games'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

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
    formatDate(dateStr) {
      if (!dateStr) return ''
      return dayjs(dateStr).fromNow()
    },

    websiteHost(url) {
      if (!url) return ''
      return url.replace(/^\w+:\/\//, '').replace(/^www\./, '').split('/')[0]
    },

    platformNames(row) {
      return (row.game?.platforms || []).map(platform => platform.name)
    },

    platformSummary(row) {
      const names = this.platformNames(row)
      if (!names.length) return 'no platform'
      if (names.length <= 2) return names.join(', ')
      return `${names.slice(0, 2).join(', ')} +${names.length - 2}`
    },

    isKnownSpamDomain(row) {
      return this.matchedRules(row).includes('history.known_spam_domain')
    },

    matchedRules(row) {
      return (row.spam_assessment?.matched_rules || []).map(hit => hit.rule)
    },

    verdictLabel(verdict) {
      return { spam: 'Spam', uncertain: 'Needs a look', clean: 'Clean' }[verdict] || verdict
    },

    verdictTagType(verdict) {
      return { spam: 'danger', uncertain: 'warning', clean: 'success' }[verdict] || 'info'
    },

    getSubmissionIndex(submissionId) {
      for (let index = 0; index < this.submissions.length; index++) {
        if (this.submissions[index].id === submissionId) {
          return index
        }
      }
    },

    acceptSubmission(submissionId) {
      sendSubmissionAccept(submissionId).then(response => {
        if (response.data.accepted) {
          this.submissions.splice(this.getSubmissionIndex(submissionId), 1)
        }
      })
    },

    rejectSubmission(submissionId) {
      sendSubmissionReject(submissionId).then(response => {
        if (!response.data.accepted) {
          this.submissions.splice(this.getSubmissionIndex(submissionId), 1)
        }
      })
    },

    rejectAndBanSubmission(row) {
      const username = row.user?.username
      ElMessageBox.confirm(
        `Reject "${row.game?.name}", delete the submitted game and deactivate ${username}?`,
        'Reject and ban',
        { confirmButtonText: 'Reject & ban', cancelButtonText: 'Cancel', type: 'warning' }
      )
        .then(() => sendSubmissionRejectAndBan(row.id))
        .then(response => {
          if (response.data.banned) {
            ElMessage.success(`${username} has been banned`)
            this.submissions.splice(this.getSubmissionIndex(row.id), 1)
          }
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.game-cell {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 4px 0;
}

.banner-wrapper {
  position: relative;
  width: 64px;
  height: 24px;
  flex-shrink: 0;
}

.game-banner {
  width: 64px;
  height: 24px;
  object-fit: cover;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;

  &--placeholder {
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--system-container-background, #f0f2f5);
    color: var(--system-page-tip-color);
    font-size: 14px;
  }
}

.game-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.game-name {
  color: var(--system-primary-color);
  text-decoration: none;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
}

.game-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--system-page-tip-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-slug {
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-website {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-description,
.game-reason {
  font-size: 12px;
  color: var(--system-page-tip-color);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.game-reason {
  font-style: italic;
}

.actions-cell {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
}

.actions-cell .el-button + .el-button {
  margin-left: 0;
}

.user-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.user-name {
  font-weight: 500;
}

.user-meta {
  font-size: 12px;
  color: var(--system-page-tip-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.date-cell {
  font-size: 12px;
  color: var(--system-page-tip-color);
}

.spam-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.spam-rules {
  font-size: 12px;
  color: var(--system-page-tip-color);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 210px;
}

.spam-unavailable {
  color: var(--system-page-tip-color);
}
</style>
