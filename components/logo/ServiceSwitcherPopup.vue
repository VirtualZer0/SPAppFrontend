<template>
  <div
    class="services"
    @mouseleave="emits('hide')"
  >
    <MCSwitcher class="switcher" />
    <NuxtLink
      v-for="service in services"
      :key="service.key"
      class="service"
      :class="service.class"
      :to="service.path"
    >
      <img
        :src="service.logo"
        width="32"
        height="32"
        alt="Лого"
      />
      <div class="name">
        {{ service.name }}
      </div>
    </NuxtLink>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'nuxt/dist/app/compat/capi';
import MCSwitcher from '../blocks/other/MCSwitcher.vue';

const emits = defineEmits(['hide']);
const props = defineProps({
  services: {
    type: Array as PropType<any[]>,
    default: () => []
  }
});
</script>
<style lang="scss" scoped>
.services {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 4px;

  .service {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 1.2rem;
    color: #fff;
    transition: color 0.3s ease;

    &:hover {
      color: var(--p1-color);
    }
  }

  .switcher {
    display: none;
  }

  .name {
    transition: transform 0.3s ease;
  }

  a:hover {
    .name {
      transform: translateX(7px);
    }
  }

  @media (max-width: 640px) {
    .switcher {
      display: flex;
      background: var(--bg-overlay-color);
      font-size: 1rem;
      margin-bottom: 12px;
    }
  }
}
</style>
