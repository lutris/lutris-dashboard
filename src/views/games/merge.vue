<template>
  <div class="app-container">
    <el-row>
      <h1>Game merge</h1>
      <el-col :span="12">
        <game-searh-input />
        <div v-if="game_1">
          <game-card :game="game_1" />
        </div>
      </el-col>
      <el-col :span="12">
        <game-search-input />
        <div v-if="game_2">
          <game-card :game="game_2" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import GameSearchInput from '@/components/GameSearchInput'

export default {
  name: 'GameMerge',
  components: { GameSearchInput },
  data() {
    return {
      game_1: null,
      game_2: null
    }
  },
  mounted() { }
}
</script>
