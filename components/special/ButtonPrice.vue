<template>
  <div class="button-price">
    <slot />
    <div
      v-if="!hide"
      class="price"
    >
      {{ price }}
      <img
        src="/img/icons/diamond.svg"
        height="18"
        width="18"
        alt="АРы"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  price: {
    type: Number,
    default: 0
  },
  hide: {
    type: Boolean,
    default: false
  }
});
</script>
<style lang="scss" scoped>
.button-price {
  position: relative;

  &:hover {
    .price {
      border-color: var(--interact-color);
      transform: scale(1.1);
    }
  }
}
.price {
  pointer-events: none;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 2px 6px;
  right: -15px;
  top: -15px;
  background: var(--bg-overlay-color);
  border: 2px solid var(--el-color);
  border-radius: 8px;
  color: var(--fg-color);
  transition: all 0.1s linear;
  transition-property: border-color transform;
}
</style>
