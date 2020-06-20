<template>
  <div class="app-container">
    <el-row>
      <h1>Game merge
        <span v-if="game_1 && game_2">
          <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="el-icon-info"
            icon-color="red"
            title="Merge games? The game on the right will be merged with the left one and deleted."
            @onConfirm="doMerge()"
          >
            <el-button
              slot="reference"
              type="warning"
              icon="el-icon-connection" />
          </el-popconfirm>
        </span>
      </h1>
      <el-col :span="12">
        <game-search-input :on-select="onLoadGame1" />
        <div v-if="game_1">
          <game-card :game="game_1" />
        </div>
      </el-col>
      <el-col :span="12">
        <game-search-input :on-select="onLoadGame2" />
        <div v-if="game_2">
          <game-card :game="game_2" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GameSearchInput from '@/components/GameSearchInput'
import GameCard from '@/components/GameCard'
import { getGame, mergeGames } from '@/api/games'

export default {
  name: 'GameMerge',
  components: { GameSearchInput, GameCard },
  data() {
    return {
      game_1: null,
      game_2: null
    }
  },
  mounted() { },
  methods: {
    onLoadGame1(slug) {
      getGame(slug).then(response => {
        this.game_1 = response.data
      })
    },
    onLoadGame2(slug) {
      getGame(slug).then(response => {
        this.game_2 = response.data
      })
    },
    doMerge() {
      mergeGames(this.game_1.slug, this.game_2.slug).then(() => {
        this.game_2 = null
      })
    }
  }
}
</script>
