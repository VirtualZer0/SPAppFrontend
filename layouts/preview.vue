<template>
  <main class="preview-layout layout text-m">
    <slot />
  </main>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.preview-layout {
  max-width: 1280px;
  max-height: 640px;
  overflow: hidden;
}
</style>
