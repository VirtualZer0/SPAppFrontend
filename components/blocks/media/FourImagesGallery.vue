<template>
  <div
    class="four-images-gallery"
    :class="`c-${images.length}`"
  >
    <img
      v-for="(img, num) in images"
      :key="num"
      :class="`i-${num + 1}`"
      preview
      class="image"
      :src="(img as string)"
    />
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
});
</script>
<style lang="scss" scoped>
.four-images-gallery {
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;

  &.c-4 {
    grid-template-areas:
      'i-1 i-1 i-2 i-2'
      'i-3 i-3 i-4 i-4';
  }

  &.c-3 {
    grid-template-areas:
      'i-1 i-1 i-2 i-2'
      'i-1 i-1 i-3 i-3';
  }

  &.c-2 {
    grid-template-areas:
      'i-1 i-1 i-2 i-2'
      'i-1 i-1 i-2 i-2';
  }

  &.c-1 {
    grid-template-areas:
      'i-1 i-1 i-1 i-1'
      'i-1 i-1 i-1 i-1';
  }

  .i-1 {
    grid-area: i-1;
  }

  .i-2 {
    grid-area: i-2;
  }

  .i-3 {
    grid-area: i-3;
  }

  .i-4 {
    grid-area: i-4;
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>
