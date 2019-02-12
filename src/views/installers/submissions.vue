<template>
  <div class="app-container">
    <submission-table/>
  </div>
</template>

<script>
import SubmissionTable from './submissionTable'
export default {
  name: 'Submissions',
  components: { SubmissionTable }
}
</script>
