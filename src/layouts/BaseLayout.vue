<template>
  <main class="content-wrapper">
    <div v-if="ready" class="content">
      <slot></slot>
    </div>

    <div v-else>
      <div class="loading-circle"></div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'BaseLayout',
  props: ['ready']
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables.scss';

.content-wrapper {
  padding: 2rem 5rem;
}

.loading-circle {
  width: 64px;
  height: 64px;
  border: solid 8px $lightGray;
  border-bottom-color: $mainColor;
  border-radius: 50%;
  animation: rotate 1s infinite linear;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
}

@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>