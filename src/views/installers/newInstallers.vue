<template>
  <div class="app-container">
    <p>Total new installers: {{ totalInstallers }}
      |
      <a v-if="previousURL" href="#" @click="onPreviousClick">Previous</a>
      <a v-if="nextURL" href="#" @click="onNextClick">Next</a>
      |
      <a v-if="order=='newest'" href="#" @click="onSortBy('oldest')">Sort by oldest</a>
      <a v-if="order=='oldest'" href="#" @click="onSortBy('newest')">Sort by newest</a>
    </p>
    <new-installers-table
      :loading="loading"
      :new-installers="newInstallers" />
  </div>
</template>

<script>
import NewInstallersTable from './newInstallersTable.vue'
import { fetchNewInstallers } from '@/api/installers'
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
      this.loading = true
      fetchNewInstallers(url, this.order).then(response => {
        this.newInstallers = []
        this.totalInstallers = response.data.count
        this.nextURL = response.data.next
        this.previousURL = response.data.previous
        for (let i = 0; i < response.data.results.length; i++) {
          const newInstaller = response.data.results[i]
          this.newInstallers.push(newInstaller)
        }
        this.loading = false
      })
    },
    onPreviousClick(event) {
      localStorage.setItem('newInstallersCurrentURL', this.previousURL)
      this.getNewInstallers(this.previousURL)
      event.preventDefault()
    },
    onNextClick(event) {
      localStorage.setItem('newInstallersCurrentURL', this.nextURL)
      this.getNewInstallers(this.nextURL)
      event.preventDefault()
    },
    onSortBy(order) {
      this.order = order
      localStorage.setItem('newInstallersSortOrder', this.order)
      this.getNewInstallers()
    }
  }
}
</script>
