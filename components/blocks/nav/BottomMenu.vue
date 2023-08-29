<template>
  <div class="bottom-menu">
    <div class="items">
      <NuxtLink
        v-for="item in menu"
        :key="item.name"
        :to="item.link"
      >
        <span
          class="pi"
          :class="item.icon"
        />
        {{ item.name }}
      </NuxtLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import Button from 'primevue/button';

const props = defineProps({
  menu: {
    type: Array as PropType<{ name: string; link: string; icon: string }[]>,
    default: () => []
  }
});
</script>
<style lang="scss" scoped>
.bottom-menu {
  position: fixed;
  z-index: 100;
  width: 100vw;
  left: 0;
  bottom: 0;
  backdrop-filter: blur(10px);
  background: rgba(27, 27, 27, 0.6);
  border-top: 1px solid rgba(27, 27, 27, 0.2);
  height: 54px;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-weight: bold;

  .items {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    font-size: 0.8rem;

    .pi {
      font-size: 1.4rem;
    }
  }

  @media (max-width: 1024px) {
    display: flex;
  }
}
</style>
