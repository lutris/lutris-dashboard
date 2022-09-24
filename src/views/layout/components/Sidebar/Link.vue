<template>
  <router-link :to="to">
  </router-link>
</template>

<script>
export default {
  name: "SidebarLink",
  props: {
    to: {
      type: String,
      required: true,
    },
  }
};
</script>
