<template>
  <main class="empty-layout layout text-m">
    <div class="container">
      <slot />
    </div>
  </main>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.empty-layout {
  .container {
    max-width: 1920px;
    margin: 0 auto;
  }
}
</style>
