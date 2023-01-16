<template>
  <div class="app-container">
    <p>Total new installers: {{ totalInstallers }}
      |
      <a v-if="previousURL" href="#" @click.prevent="onPreviousClick">Previous</a>
      <a v-if="nextURL" href="#" @click.prevent="onNextClick">Next</a>
      |
      <a v-if="order=='newest'" href="#" @click.prevent="onSortBy('oldest')">Sort by oldest</a>
      <a v-if="order=='oldest'" href="#" @click.prevent="onSortBy('newest')">Sort by newest</a>
    </p>
    <new-installers-table
      :loading="loading"
      :new-installers="newInstallers" />
  </div>
</template>

<script>
import NewInstallersTable from './newInstallersTable.vue'

export default {
  name: 'NewInstallers',
  components: { NewInstallersTable },
  data() {
    return {
      newInstallers: null,
      totalInstallers: 0,
      loading: false,
      currentURL: localStorage.getItem('newInstallersCurrentURL'),
      nextURL: null,
      previousURL: null,
      order: localStorage.getItem('newInstallersSortOrder') || 'newest'
    }
  },
  created() {
    this.getNewInstallers(this.currentURL)
  },
  methods: {
    getNewInstallers(url) {
    },
    onPreviousClick() {
      localStorage.setItem('newInstallersCurrentURL', this.previousURL)
      this.getNewInstallers(this.previousURL)
    },
    onNextClick() {
      localStorage.setItem('newInstallersCurrentURL', this.nextURL)
      this.getNewInstallers(this.nextURL)
    },
    onSortBy(order) {
      this.order = order
      localStorage.setItem('newInstallersSortOrder', this.order)
      this.getNewInstallers()
    }
  }
}
</script>
