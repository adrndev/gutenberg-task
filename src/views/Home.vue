<template>
  <base-layout ready="true">
    <div class="home">
      <p>
        Welcome at out e-library!
        This website is made for a recrutation task.
      </p>
      <h1>by Adrian Jaskot</h1>
    </div>
  </base-layout>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout.vue'

export default {
  name: 'Home',
  components: {
    BaseLayout
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

h1 {
  color: $mainColor;
}
</style>