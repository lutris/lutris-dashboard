<template>
  <div>
    <div v-if="submission">
      <h1>{{ submission.name }} ({{ submission.year }})</h1>
      <p>Submission for <strong>{{ submission.slug }}</strong> by {{ submission.user }} on {{ submittedAt }}</p>
      <p v-if="submission.draft">This submission is a draft, it may not be complete yet.</p>
      <p>{{ submission.reason }}</p>
      <div>
        <strong>Runner</strong>
        <div class="prettydiff" v-html="runnerDiff" />
      </div>
      <div>
        <strong>Version</strong>
        <div class="prettydiff" v-html="versionDiff" />
      </div>
      <div>
        <strong>Notes</strong>
        <div class="prettydiff" v-html="notesDiff" />
      </div>
      <div>
        <strong>Description</strong>
        <div class="prettydiff" v-html="descriptionDiff"/>
      </div>
      <div class="script-diff">
        <strong>Script</strong>
        <pre class="prettydiff" v-html="scriptDiff" />
        <button
          id="acceptSubmission"
          class="el-button el-button--primary el-button--small"
          @click="onSubmissionAccept">Accept</button>
        <button
          id="rejectSubmission"
          class="el-button el-button--danger el-button--small"
          @click="onRejectSubmission">Reject</button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchSubmission, fetchRevisions, acceptSubmission, deleteSubmission } from '@/api/installers'
import { Message } from 'element-ui'
import prettydiff from 'prettydiff'
import moment from 'moment'
export default {
  name: 'SubmissionDetail',
  data() {
    return {
      submission: null,
      installers: null,
      originalInstaller: null,
      submissionLoading: false,
      revisionsLoading: false,
      contentDiff: null
    }
  },
  computed: {
    revisionId() {
      return this.$route.params && this.$route.params.id
    },
    submittedAt() {
      const created_moment = moment(this.submission.created_at)
      return created_moment.format('MMMM Do hh:mm') + ' (' + created_moment.fromNow() + ')'
    },
    runnerDiff() {
      if (this.originalInstaller) {
        return this.outputDiff(this.originalInstaller.runner, this.submission.runner)
      }
      return this.submission.runner
    },
    versionDiff() {
      if (this.originalInstaller) {
        return this.outputDiff(this.originalInstaller.version, this.submission.version)
      }
      return this.submission.version
    },
    descriptionDiff() {
      if (this.originalInstaller) {
        return this.outputDiff(this.originalInstaller.description, this.submission.description)
      }
      return this.submission.notes
    },
    notesDiff() {
      if (this.originalInstaller) {
        return this.outputDiff(this.originalInstaller.notes, this.submission.notes)
      }
      return this.submission.notes
    },
    scriptDiff() {
      if (this.originalInstaller) {
        const original = this.originalInstaller.content.replace('\r\n', '\n')
        const submission = this.submission.content.replace('\r\n', '\n')
        return this.outputDiff(original, submission)
      }
      return this.submission.content
    }
  },
  created() {
    this.getSubmission()
  },
  methods: {
    outputDiff(originalText, newText) {
      if (!originalText) {
        originalText = ''
      }
      const options = prettydiff.defaults
      options.mode = 'diff'
      options.language = 'text'
      options.diff_format = 'html'
      options.diff_space_ignore = false
      options.diff_view = 'inline'
      options.source = originalText
      options.diff = newText
      return prettydiff.mode(options)
    },

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
    onSubmissionAccept() {
      acceptSubmission(this.revisionId).then(response => {
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
    }
  }
}
</script>

<style lang="scss">
.prettydiff > p {
  display: none;
}
.diff {
  background-color: #E4F1FE;
  display: block;
  font-family: 'Courier New', Courier, monospace;
  padding: 0 1em;
  ol {
    padding: 0;
    vertical-align: top;
    display: inline-block;
    list-style-type: none;
  }
  ol.count {
    display: none;
  }
  li {
    line-height: 1.4em;
  }
  h3.texttitle, p.author {
    display: none;
  }
  .delete {
    background-color: #FFCFF7;
  }
  .equal {
    background-color: #E4F1FE;
  }
  .insert {
    background-color: #C4FCDC;
  }
  .empty {
    border: 1px solid red;
    line-height: 1em;
    height: 1em;
    background-color: grey;
  }
  em {
    outline: 1px dotted salmon;
    background-color: #FFC46C;
    line-height: 0.8em;
    padding: 0;
  }
.replace {
    background-color: #FFEED5;

  }
  .diff-left, .diff-right {
    border: 1px solid #000;
    display: inline-block;
  }
}
</style>
