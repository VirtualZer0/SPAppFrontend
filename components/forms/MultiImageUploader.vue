<template>
  <div class="multi-image-uploader">
    <ImageUploader
      v-for="i in maxCount"
      :key="i"
      :alt="curImages[i - 1]"
      :default-preview="typeof curImages[i-1] == 'string' ? curImages[i-1] as string : undefined"
      @selected="curImages[i - 1] = $event"
      @removed="curImages[i - 1] = null"
    />
  </div>
</template>
<script lang="ts" setup>
import ImageUploader from './ImageUploader.vue';
const props = defineProps({
  maxCount: {
    type: Number,
    default: 4
  },
  images: {
    type: Array,
    default: () => []
  }
});

const curImages = ref(props.images);
</script>
<style lang="scss" scoped>
.multi-image-uploader {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
