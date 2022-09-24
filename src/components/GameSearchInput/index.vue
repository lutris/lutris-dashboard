<template>
  <div v-if="handleSelect">
    <el-autocomplete
      :fetch-suggestions="getGameSuggestions"
      v-model="game_name"
      class="inline-input"
      placeholder="Search for a game…"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import { searchGames } from "@/api/games";

export default {
  name: "GameSearchInput",
  components: {},
  props: {
    onSelect: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      timeout: null,
      game_name: "",
      game: null,
    };
  },
  methods: {
    gameMedia(relUrl) {
      return "https://lutris.net" + relUrl;
    },
    // Return URL for the submission moderation page
    submissionUrl(revisionId) {
      return "/#/installers/submissions/" + revisionId;
    },
    getGameSuggestions(queryString, cb) {
      if (queryString.length < 3) {
        return cb([]);
      }
      searchGames(queryString).then((response) => {
        const results = response.data.results.map((item) => {
          return { value: item.name, slug: item.slug };
        });
        cb(results);
      });
    },
    handleSelect(item) {
      this.onSelect(item.slug);
    },
  },
};
</script>
