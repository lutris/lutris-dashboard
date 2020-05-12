<template>
  <div>
    <el-autocomplete
      :fetch-suggestions="getGameSuggestions"
      v-model="game_name"
      class="inline-input"
      placeholder="Please Input"
      @select="handleSelect"
    />
    <div v-if="game">
      <el-card>

        <div slot="header">
          <img :src="gameMedia(game.banner_url)" :alt="game.banner_url">
          <strong>{{ game.name }}</strong>
          <el-tag type="success">{{ game.slug }} ({{ game.id }})</el-tag>
        </div>

        <div>
          <p>Year: {{ game.year }}</p>
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
    </div>
  </div>
</template>

<script>
import { searchGames, getGame } from '@/api/games'

export default {
  name: 'SearchableGamePane',
  data() {
    return {
      timeout: null,
      game_name: '',
      game: null
    }
  },
  methods: {
    gameMedia(relUrl) {
      return 'https://lutris.net' + relUrl
    },
    // Return URL for the submission moderation page
    submissionUrl(revisionId) {
      return '/#/installers/submissions/' + revisionId
    },
    getGameSuggestions(queryString, cb) {
      if (queryString.length < 3) {
        return cb([])
      }
      searchGames(queryString).then(response => {
        const results = response.data.results.map((item) => {
          return { value: item.name, slug: item.slug }
        })
        cb(results)
      })
    },
    handleSelect(item) {
      getGame(item.slug).then(response => {
        this.game = response.data
        this.game_name = this.game.name
      })
    }
  }
}
</script>
