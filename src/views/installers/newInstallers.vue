<template>
  <div class="app-container">
    <new-installers-table
      :loading="loading"
      :new-installers="newInstallers" />
  </div>
</template>

<script>
import NewInstallersTable from './newInstallersTable'
import { fetchNewInstallers } from '@/api/installers'
export default {
  name: 'NewInstallers',
  components: { NewInstallersTable },
  data() {
    return {
      newInstallers: null,
      loading: false
    }
  },
  created() {
    this.getNewInstallers()
  },
  methods: {
    getNewInstallers() {
      this.loading = true
      fetchNewInstallers().then(response => {
        this.newInstallers = []
        for (let i = 0; i < response.data.results.length; i++) {
          const newInstaller = response.data.results[i]
          this.newInstallers.push(newInstaller)
        }
        this.loading = false
      })
    }
  }
}
</script>
