<template>
    <div v-for="screenshot in screenshots" :key="screenshot.id">
        <h2>{{ screenshot.game.name }}</h2>
        <p>
            <img :src="screenshot.uploaded_by.avatar_url" class="avatar">
            Uploaded by <strong>{{ screenshot.uploaded_by.username }}</strong>
            on <strong>{{ screenshot.uploaded_at }}</strong>
            {{ screenshot.id }}
        </p>
        <img :src="screenshot.image" class="screenshot"/>
        <br>
        <el-button
            class="el-button--primary"
            @click="onScreenshotAccept(screenshot.id)">
            Accept
        </el-button>
        <el-button
            class="el-button--danger"
            @click="onScreenshotRefuse(screenshot.id)">
            Refuse
        </el-button>
    </div>
  </template>

  <script>

  import { sendScreenshotReview } from '@/api/games'

  export default {
    name: 'GameScreenshotTable',
    props: {
      screenshots: {
        type: Array,
        default: () => []
      }
    },
    methods: {

      getScreenshotIndex(screenshotId) {
        for (let index = 0; index < this.screenshots.length; index++) {
          if (this.screenshots[index].id === screenshotId) {
            return index
          }
        }
      },

      onScreenshotAccept(screenshotId) {
        sendScreenshotReview(screenshotId, "accept").then(response => {
          if (response.data.accepted) {
            this.screenshots.splice(this.getScreenshotIndex(screenshotId), 1)
          }
        })
      },

      onScreenshotRefuse(screenshotId) {
        sendScreenshotReview(screenshotId, "refuse").then(response => {
          this.screenshots.splice(this.getScreenshotIndex(screenshotId), 1)
        })
      }
    }
  }
  </script>

  <style scoped>
    .avatar {
        max-width: 24px;
    }
    .screenshot {
        max-width: 900px;
    }
  </style>
