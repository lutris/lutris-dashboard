<template>
  <div>
    <div v-if="submission">
      <h1>
        <a :href="'https://lutris.net/games/' + submission.game_slug">{{ submission.name }} ({{ submission.year }})</a>
        <span style="float: right;">
          <button
            class="el-button el-button--primary el-button--small"
            @click="onToggleViewType"
          >
            Toggle View
          </button>
        </span>
      </h1>

      <div>
        Submission for <strong>{{ submission.slug }}</strong> by {{ submission.user }} on {{ submittedAt }}
        <div v-if="originalInstaller">
          <select
            id="revision-select"
            v-model="currentRevisionId"
            name="revisionSelect"
            style="width: 400px;"
            @change="onRevisionSelect($event)"
          >
            <option
              v-for="revision in getSubmitterRevisions()"
              :key="revision.revision_id"
              :value="revision.revision_id"
            >
              {{ revision.comment }}
            </option>
          </select>
          <div v-if="getOtherRevisions()" style="float: right; ">
            <span>Revisions from other users:</span>
            <select
              id="revision-select"
              v-model="currentRevisionId"
              name="revisionSelect"
              style="width: 400px"
              @change="onRevisionSelect($event)"
            >
              <option
                v-for="revision in getOtherRevisions()"
                :key="revision.revision_id"
                :value="revision.revision_id"
              >
                {{ revision.comment }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <p v-if="submission.draft">
        This submission is a draft, it may not be complete yet.
      </p>
      <p>{{ submission.reason }}</p>
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        field="runner"
        label="Runner" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        field="version"
        label="Version" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        field="description"
        label="Description" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        field="notes"
        label="Notes" />
      <editable-diff
        :value="submission"
        :original="originalInstaller"
        :view-type="viewType"
        field="content"
        label="Script" />
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
import { fetchSubmission, fetchRevisions, acceptSubmission, deleteSubmission } from '@/api/installers'
import { Message } from 'element-ui'
import moment from 'moment'
import EditableDiff from '@/components/EditableDiff'

export default {
  name: 'SubmissionDetail',
  components: {
    EditableDiff
  },
  data() {
    return {
      submission: null,
      installers: null,
      originalInstaller: null,
      currentRevisionId: null,
      submissionLoading: false,
      revisionsLoading: false,
      viewType: 'inline'
    }
  },
  computed: {
    revisionId() {
      return this.$route.params && this.$route.params.id
    },
    submittedAt() {
      const created_moment = moment(this.submission.created_at)
      return created_moment.format('MMMM Do hh:mm') + ' (' + created_moment.fromNow() + ')'
    }
  },
  created() {
    this.getSubmission()
    this.currentRevisionId = this.revisionId
  },
  methods: {
    getSubmission() {
      this.submissionLoading = true
      fetchSubmission(this.revisionId).then(response => {
        this.submission = response.data
        this.submissionsLoading = false
        this.getRevisions(this.submission.game_slug)
      })
    },
    getRevisions(slug) {
      this.revisionsLoading = true
      fetchRevisions(slug).then(response => {
        this.revisionsLoading = false
        this.installers = response.data.installers
        for (const installer of this.installers) {
          if (this.submission.installer_id === installer.id) {
            this.originalInstaller = installer
            break
          }
        }
      })
    },
    // Filter revisions by the author of this submission
    getSubmitterRevisions() {
      return this.originalInstaller.revisions.filter(revision => revision.user === this.submission.user)
    },
    // Return revisions from different authors
    getOtherRevisions() {
      return this.originalInstaller.revisions.filter(revision => revision.user !== this.submission.user)
    },
    onSubmissionAccept() {
      acceptSubmission(this.submission).then(response => {
        Message({
          message: 'Submission has been accepted',
          type: 'info',
          duration: 5000
        })
        this.$router.push({ path: '/installers/submissions' })
      })
    },
    onRejectSubmission() {
      deleteSubmission(this.revisionId).then(response => {
        Message({
          message: 'Submission has been deleted',
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
    },
    onRevisionSelect(event) {
      for (const revision of this.originalInstaller.revisions) {
        if (revision.revision_id === this.currentRevisionId) {
          this.submission = revision
        }
      }
    }
  }
}
</script>
