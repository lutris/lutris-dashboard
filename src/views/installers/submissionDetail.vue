<template>
  <div>
    <div v-if="submission">
      <h1>
        <a :href="'https://lutris.net/games/' + submission.game_slug">{{ submission.name }} ({{ submission.year }})</a>
        <span style="float: right;">
          <el-button
            class="el-button--primary el-button--small"
            @click="onToggleViewType"
          >
            Toggle View
          </el-button>
          <el-button
            class="el-button--secondary el-button--small"
            @click="onToggleCharDiff"
          >
            Toggle char diff
          </el-button>
        </span>
      </h1>

      <div>
        <p>Submission for <strong>{{ submission.slug }}</strong> by {{ submission.user }}</p>
        <p v-if="originalInstaller">
          Original installer {{ originalInstaller.slug }} (published: {{ originalInstaller.published }}
          , draft: {{ originalInstaller.draft }}) updated at {{ updatedAt }}
        </p>
        <p v-else>No original installer for submission</p>
        <p>Sent on {{ submittedAt }}</p>

        <div>
          <game-search-input :on-select="onGameSelected" />
          <el-select
            v-if="comparedGame"
            v-model="installerId"
            @change="onInstallerSelect($event)"
          >
            <el-option
              v-for="installer in comparedGame.installers"
              :key="installer.version"
              :value="installer.version"
            >
              {{ installer.version }}
            </el-option>
          </el-select>
        </div>
      </div>

      <p v-if="submission.draft" class="warning-message">
        This submission is a draft, it may not be complete yet.
      </p>
      <p v-if="submission.reason" class="warning-message">{{ submission.reason }}</p>
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="runner"
        label="Runner" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="version"
        label="Version" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="description"
        label="Description" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="notes"
        label="Notes" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="content"
        label="Script" />
      <div>
        <label>Review (this will be emailed to the script author, only used for rejection)</label>
        <div>
          <textarea
            id="reviewBox"
            ref="reviewBox"
            v-model="submission.review"
            style="width: 100%; margin-bottom: 1em;"
          />
        </div>
      </div>
      <div>
        <button
          id="acceptSubmission"
          class="el-button el-button--primary el-button--small"
          @click="onSubmissionAccept"
        >
          Accept
        </button>
        <button
          id="rejectSubmission"
          class="el-button el-button--danger el-button--small"
          @click="onRejectSubmission"
        >
          Reject
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchDraft, fetchRevisions, acceptSubmission, rejectSubmission } from '@/api/installers'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { getGame } from '@/api/games'
import EditableDiff from '@/components/EditableDiff/index.vue'
import GameSearchInput from '@/components/GameSearchInput/index.vue'

export default {
  name: 'SubmissionDetail',
  components: {
    EditableDiff, GameSearchInput
  },
  data() {
    return {
      submission: null,
      installers: null,
      installerId: null,
      comparedGame: null,
      originalInstaller: null,
      currentRevisionId: null,
      submissionLoading: false,
      revisionsLoading: false,
      showCharDiff: localStorage.getItem('showCharDiff') === 'true' || false,
      viewType: localStorage.getItem('diffViewType') || 'inline'
    }
  },
  computed: {
    draftId() {
      return this.$route.params && this.$route.params.id
    },
    submittedAt() {
      const created_moment = moment(this.submission.created_at)
      return created_moment.format('MMMM Do hh:mm') + ' (' + created_moment.fromNow() + ')'
    },
    updatedAt() {
      if (!this.originalInstaller) {
        return ''
      }
      const updatedMoment = moment(this.originalInstaller.updated_at)
      return updatedMoment.format('MMMM Do hh:mm') + ' (' + updatedMoment.fromNow() + ')'
    }
  },
  created() {
    this.getSubmission()
    this.currentDraftId = this.draftId
  },
  methods: {
    getSubmission() {
      this.submissionLoading = true
      fetchDraft(this.draftId).then(response => {
        this.submission = response.data
        this.submissionsLoading = false
        this.originalInstaller = this.submission["base_installer"]
      })
    },
    onGameSelected(slug) {
      getGame(slug).then(response => {
        this.comparedGame = response.data
      })
    },
    onSubmissionAccept() {
      acceptSubmission(this.submission).then(response => {
        ElMessage({
          message: 'Submission has been accepted',
          type: 'info',
          duration: 5000
        })
        this.$router.push({ path: '/installers/submissions' })
      })
    },
    onRejectSubmission() {
      rejectSubmission(this.submission).then(response => {
        ElMessage({
          message: 'Submission has been rejected',
          type: 'info',
          duration: 5000
        })
        this.$router.push({ path: '/installers/submissions' })
      })
    },
    onToggleViewType() {
      if (this.viewType === 'inline') {
        this.viewType = 'sidebyside'
      } else {
        this.viewType = 'inline'
      }
      localStorage.setItem('diffViewType', this.viewType)
    },
    onToggleCharDiff() {
      this.showCharDiff = !this.showCharDiff
      localStorage.setItem('showCharDiff', this.showCharDiff)
    },
    onInstallerSelect(version) {
      for (const installer of this.comparedGame.installers) {
        if (installer.version === version) {
          this.originalInstaller = installer
        }
      }
    },
    onRevisionSelect() {
      for (const revision of this.originalInstaller.revisions) {
        if (revision.revision_id === this.currentRevisionId) {
          this.submission = revision
        }
      }
    }
  }
}
</script>
