<template>
  <div class="app-container">
    <el-row>
      <h1>Game merge</h1>
      <el-col :span="12">
        <searchable-game-pane />
        <div v-if="game_1">
          <game-card :game="game_1" />
        </div>
      </el-col>
      <el-col :span="12">
        <searchable-game-pane />
        <div v-if="game_2">
          <game-card :game="game_2" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import SearchableGamePane from '@/components/SearchableGamePane'

export default {
  name: 'GameMerge',
  components: { SearchableGamePane },
  data() {
    return {
      game_1: null,
      game_2: null
    }
  },
  mounted() { }
}
</script>
