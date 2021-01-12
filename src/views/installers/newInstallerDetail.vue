<template>
  <div class="app-container">
    <div v-if="installer">
      <h1>
        <a :href="'https://lutris.net/games/' + installer.game_slug">{{ installer.name }} ({{ installer.year }})</a>
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
        Installer for <strong>{{ installer.slug }}</strong> by {{ installer.user }}<br>
        Sent on {{ submittedAt }}
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

      <p v-if="installer.draft">
        This installer is a draft, it may not be complete yet.
      </p>
      <editable-diff
        :value="installer"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="runner"
        label="Runner" />
      <editable-diff
        :value="installer"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="version"
        label="Version" />
      <editable-diff
        :value="installer"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="description"
        label="Description" />
      <editable-diff
        :value="installer"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="notes"
        label="Notes" />
      <editable-diff
        :value="installer"
        :original="originalInstaller"
        :view-type="viewType"
        :char-diff="showCharDiff"
        field="content"
        label="Script" />
      <div>
        <button
          id="acceptInstaller"
          class="el-button el-button--primary el-button--small"
          @click="onInstallerAccept"
        >
          Publish
        </button>
        <button
          id="deleteInstaller"
          class="el-button el-button--danger el-button--small"
          @click="onInstallerReject"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchInstaller, acceptInstaller, deleteInstaller } from '@/api/installers'
import { Message } from 'element-ui'
import moment from 'moment'
import { getGame } from '@/api/games'
import EditableDiff from '@/components/EditableDiff'
import GameSearchInput from '@/components/GameSearchInput'

export default {
  name: 'NewInstallerDetail',
  components: {
    EditableDiff, GameSearchInput
  },
  data() {
    return {
      installer: null,
      installers: null,
      comparedGame: null,
      originalInstaller: null,
      currentRevisionId: null,
      loading: false,
      showCharDiff: true,
      viewType: 'inline'
    }
  },
  computed: {
    installerId() {
      return this.$route.params && this.$route.params.id
    },
    submittedAt() {
      const created_moment = moment(this.installer.created_at)
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
    this.getInstaller()
    this.currentRevisionId = this.installerId
  },
  methods: {
    getInstaller() {
      this.loading = true
      fetchInstaller(this.installerId).then(response => {
        this.installer = response.data
        this.loading = false
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
    onGameSelected(slug) {
      getGame(slug).then(response => {
        this.comparedGame = response.data
      })
    },
    onInstallerAccept() {
      acceptInstaller(this.installer).then(response => {
        Message({
          message: 'Installer has been accepted',
          type: 'info',
          duration: 5000
        })
        this.$router.push({ path: '/installers/new' })
      })
    },
    onInstallerReject() {
      deleteInstaller(this.installer.id).then(response => {
        Message({
          message: 'Installer deleted',
          type: 'info',
          duration: 5000
        })
        this.$router.push({ path: '/installers/new' })
      })
    },
    onToggleViewType() {
      if (this.viewType === 'inline') {
        this.viewType = 'sidebyside'
      } else {
        this.viewType = 'inline'
      }
    },
    onToggleCharDiff() {
      this.showCharDiff = !this.showCharDiff
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
