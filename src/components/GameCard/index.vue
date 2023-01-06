<template>
  <el-card>

    <template #header>
      <a :href="gameURL(game.slug)" target="_blank">
        <img :src="game.banner_url" :alt="game.banner_url" style="float: left; margin-right: 10px;">
        {{ game.name }}
      </a>
      <br>
      <el-tag type="success">{{ game.slug }} ({{ game.id }})</el-tag><br>
      <span>Year: {{ game.year }}</span>
    </template>

    <div>
      <p>Users: {{ game.user_count }}</p>
      <p>Platforms: <el-tag v-for="platform in game.platforms" :key="platform.slug" type="info">{{ platform.name }}</el-tag></p>
      <p v-if="game.aliases">
        Aliases: <el-tag v-for="alias in game.aliases" :key="alias.slug" type="info">{{ alias.name }}</el-tag>
      </p>
    </div>

    <el-collapse>
      <el-collapse-item title="Description">
        <p>{{ game.description }}</p>
      </el-collapse-item>
    </el-collapse>

    <el-table
      key="id"
      :data="game.installers"
      :row-class-name="installerTableRowClass"
      fit>
      <el-table-column label="Version" prop="version" />
      <el-table-column label="Revisions">
        <template #default="props">
          <ul v-if="props.row['revisions']">
            <li v-for="revision in props.row['revisions']" :key="revision.revision_id">
              <a :href="submissionUrl(revision.revision_id)">Revision by {{ revision.user }}</a>
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Actions">
        <template #default="props">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="Info"
            icon-color="red"
            title="Really delete installer?"
            @confirm="onInstallerDelete(props.row['id'])"
          >
          <template #reference>
            <el-button
              type="danger"
              icon="Delete"
              circle />
            </template>
          </el-popconfirm>
          <el-button
            type="info"
            icon="Edit"
            circle
            @click="onShowInstaller(props.row['id'])" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      v-model="installerVisible"
      title="Installer"
      width="50%">
      <pre v-html="installerContent"></pre>
      <template #footer class="dialog-footer">
        <el-button @click="installerVisible = false">Close</el-button>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
import { deleteInstaller } from '@/api/installers'

export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      installerVisible: false,
      installerContent: ''
    }
  },
  methods: {
    gameURL(slug) {
      return 'https://lutris.net/games/' + slug
    },
    // Return URL for the submission moderation page
    submissionUrl(revisionId) {
      return '/#/installers/submissions/' + revisionId
    },
    installerTableRowClass({ row, rowIndex }) {
      if (row['published']) {
        return 'published-row'
      }
      return ''
    },
    onInstallerDelete(installerId) {
      deleteInstaller(installerId)
      for (let i = 0; i < this.game.installers.length; i++) {
        if (this.game.installers[i].id === installerId) {
          delete this.game.installers[i]
        }
      }
    },
    onShowInstaller(installerId) {
      for (let i = 0; i < this.game.installers.length; i++) {
        if (this.game.installers[i].id === installerId) {
          const installer = this.game.installers[i]
          this.installerContent = installer.content
          this.installerVisible = true
        }
      }
    }
  }
}
</script>

<style>
.el-table .published-row {
  background-color: rgb(163, 245, 163);
}
</style>
