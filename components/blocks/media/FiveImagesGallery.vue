<template>
  <div
    class="five-images-gallery"
    :class="`c-${images.length}`"
  >
    <Image
      v-for="(img, num) in images"
      :key="num"
      :class="`i-${num + 1}`"
      height="256"
      preview
      class="image-container"
      :src="img"
    >
      <template #image>
        <img
          :src="(img as string)"
          alt="image"
          class="image"
        />
      </template>
    </Image>
  </div>
</template>
<script lang="ts" setup>
import Image from 'primevue/image';

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  }
});
</script>
<style lang="scss" scoped>
.five-images-gallery {
  display: grid;
  max-height: 400px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 16px;

  &.c-5 {
    grid-template-areas:
      'i-1 i-1 i-2 i-3'
      'i-1 i-1 i-4 i-5';
  }

  &.c-4 {
    grid-template-areas:
      'i-1 i-1 i-2 i-2'
      'i-1 i-1 i-3 i-4';
  }

  &.c-3 {
    grid-template-areas:
      'i-1 i-1 i-2 i-3'
      'i-1 i-1 i-2 i-3';
  }

  &.c-2 {
    grid-template-areas:
      'i-1 i-1 i-2 i-2'
      'i-1 i-1 i-2 i-2';
  }

  &.c-1 {
    grid-template-areas:
      'i-1 i-1 . .'
      'i-1 i-1 . .';
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

  .i-5 {
    grid-area: i-5;
  }

  .image {
    object-fit: cover;
    width: 100%;
    height: 100%;

    &-container {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    max-height: 650px;

    &.c-5 {
      grid-template-areas:
        'i-1 i-1'
        'i-2 i-3'
        'i-4 i-5';
    }

    &.c-4 {
      grid-template-areas:
        'i-1 i-1'
        'i-2 i-2'
        'i-3 i-4';
    }

    &.c-3 {
      grid-template-areas:
        'i-1 i-1'
        'i-2 i-2'
        'i-3 i-3';
    }

    &.c-2 {
      grid-template-areas:
        'i-1 i-2'
        'i-1 i-2'
        'i-1 i-2';
    }

    &.c-1 {
      grid-template-areas:
        'i-1 i-1'
        'i-1 i-1'
        '. .';
    }
  }
}
</style>
