<template>
  <main class="main-layout layout text-m">
    <MainHeader key="mainHeader" />
    <div class="container">
      <slot />
    </div>
  </main>
</template>
<script lang="ts" setup>
import MainHeader from '~/components/blocks/nav/MainHeader.vue';
</script>
<style lang="scss" scoped>
.main-layout {
  background: url('/img/fx/headerfx.png') no-repeat;
  background-size: 80%;

  .container {
    padding: 24px;
    padding-top: 48px;
    max-width: 1920px;
    margin: 0 auto;
  }
}
</style>
