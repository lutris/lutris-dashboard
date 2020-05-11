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
      <h1>{{ game.name }} <el-tag type="success">{{ game.slug }} ({{ game.id }})</el-tag></h1>
      <p>Year: {{ game.year }}</p>
      <p>Platforms: <el-tag v-for="platform in game.platforms" :key="platform.slug" type="info">{{ platform.name }}</el-tag></p>
      <p>Aliases: <el-tag v-for="alias in game.aliases" :key="alias.slug" type="info">{{ alias.name }}</el-tag></p>
      <p>{{ game.description }}</p>
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
    getGameSuggestions(queryString, cb) {
      if (queryString.length < 3) {
        return cb([])
      }
      searchGames(queryString).then(response => {
        const results = response.data.results.map((item) => { return { value: item.name, slug: item.slug } })
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
