<template>
  <div class="app-container">
    <h1>Game merge</h1>
    <el-row v-show="game_1 && game_2">
      <el-col>
        <el-popconfirm
            confirm-button-text="Yes"
            cancel-button-text="No"
            icon="el-icon-info"
            icon-color="red"
            title="Merge games? The game on the right will be merged with the left one and deleted."
            @onConfirm="doMerge()"
          >
            <template #reference>
              <el-button type="warning">Merge</el-button>
            </template>
            
          </el-popconfirm>
      </el-col>
    </el-row>
    <el-row>
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
import GameSearchInput from '@/components/GameSearchInput/index.vue'
import GameCard from '@/components/GameCard/index.vue'
import { getGame, mergeGames } from '@/api/games'

export default {
  name: 'GameMerge',
  components: { 
    GameSearchInput,
    GameCard
  },
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
      console.log("Merging " +this.game_1.slug)
      mergeGames(this.game_1.slug, this.game_2.slug).then(() => {
        this.game_2 = null
      })
    }
  }
}
</script>
