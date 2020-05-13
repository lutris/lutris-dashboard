<template>
  <el-card>

    <div slot="header">
      <img :src="gameMedia(game.banner_url)" :alt="game.banner_url" style="float: left; margin-right: 10px;">
      <strong>{{ game.name }}</strong><br>
      <el-tag type="success">{{ game.slug }} ({{ game.id }})</el-tag><br>
      <span>Year: {{ game.year }}</span>
    </div>

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
      <el-collapse-item v-for="installer in game.installers" :key="installer.slug" :title="installer.slug">
        <pre v-html="installer.content"/>
        <ul v-if="installer.revisions">
          <li v-for="revision in installer.revisions" :key="revision.revision_id">
            <a :href="submissionUrl(revision.revision_id)">Revision by {{ revision.user }}</a>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
export default {
  name: 'GameCard',
  props: {
    game: {
      type: Object,
      default: null
    }
  },
  methods: {
    gameMedia(relUrl) {
      return 'https://lutris.net' + relUrl
    },
    // Return URL for the submission moderation page
    submissionUrl(revisionId) {
      return '/#/installers/submissions/' + revisionId
    }
  }
}
</script>
