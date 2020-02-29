<template>
  <div class="app-container">
    <el-row>
      <h1>Game merge</h1>
      <el-col :span="12">
        <div class="sub-title">list suggestions when activated</div>
        <el-autocomplete
          :fetch-suggestions="querySearch"
          v-model="game_1"
          class="inline-input"
          placeholder="Please Input"
          @select="handleSelect"
        />
      </el-col>
      <el-col :span="12">
        <div class="sub-title">list suggestions on input</div>
        <el-autocomplete
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          v-model="game_2"
          class="inline-input"
          placeholder="Please Input"
          @select="handleSelect"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'GameMerge',
  data() {
    return {
      links: [],
      state: '',
      timeout: null,
      game_1: null,
      game_2: null
    }
  },
  mounted() {
    this.links = this.loadAll()
  },
  methods: {
    loadAll() {
      return [
        { 'value': 'vue', 'link': 'https://github.com/vuejs/vue' },
        { 'value': 'element', 'link': 'https://github.com/ElemeFE/element' },
        { 'value': 'cooking', 'link': 'https://github.com/ElemeFE/cooking' },
        { 'value': 'mint-ui', 'link': 'https://github.com/ElemeFE/mint-ui' },
        { 'value': 'vuex', 'link': 'https://github.com/vuejs/vuex' },
        { 'value': 'vue-router', 'link': 'https://github.com/vuejs/vue-router' },
        { 'value': 'babel', 'link': 'https://github.com/babel/babel' }
      ]
    },
    querySearch(queryString, cb) {
      var links = this.links
      var results = queryString ? links.filter(this.createFilter(queryString)) : null

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 300)
    },
    createFilter(queryString) {
      return (link) => {
        return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  }
}
</script>
