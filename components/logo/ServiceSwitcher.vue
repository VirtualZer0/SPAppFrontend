<template>
  <div
    ref="switcher"
    class="service-switcher"
    @mouseenter="(overlay as any).show"
    @touchend="(overlay as any).show"
  >
    <div class="header-logo">
      <img
        :src="currentService?.logo"
        width="44"
        height="44"
        alt="Лого"
      />
      <h1>{{ currentService?.name }}</h1>
    </div>
    <OverlayPanel ref="overlay">
      <ServiceSwitcherPopup
        :services="services"
        @hide="(overlay as any).hide"
      />
    </OverlayPanel>
  </div>
</template>
<script lang="ts" setup>
import OverlayPanel from 'primevue/overlaypanel';
import MCSwitcher from '../blocks/other/MCSwitcher.vue';
import ServiceSwitcherPopup from './ServiceSwitcherPopup.vue';
import { useMainStore } from '~/store/main';

const overlay = ref<HTMLElement>();

const services = [
  {
    key: 'spapp',
    name: 'SP App',
    logo: '/img/logo/simple-logo.svg',
    path: '/',
    class: 'spapp-service'
  },
  {
    key: 'market',
    name: 'Glowberries',
    logo: '/img/market/logo-dark.svg',
    path: '/market',
    class: 'market-service'
  },
  {
    key: 'starter',
    name: 'Starter',
    logo: '/img/starter/logo-dark.svg',
    path: '/starter',
    class: 'starter-service'
  },
  {
    key: 'wa',
    name: 'WorkAssist',
    logo: '/img/company/logo-dark.svg',
    path: '/wa',
    class: 'wa-service'
  }
];

const mainStore = useMainStore();
const currentService = computed(() => services.find((s) => s.key === mainStore.server.currentService));
</script>
<style lang="scss" scoped>
.service-switcher {
  display: inline-flex;
  align-items: center;
  .header-logo {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

    img {
      margin-right: 12px;
      transition: transform 0.3s ease;
    }

    h1 {
      margin: 0;
      font-size: 1.6rem;
      white-space: nowrap;
    }

    &:hover {
      img {
        transform: scale(1.2);
      }
    }
  }

  .overlay {
    position: fixed;
  }

  @media (max-width: 640px) {
    .header-logo {
      img {
        width: 36px;
        height: 36px;
      }

      h1 {
        font-size: 1.4rem;
      }
    }
  }
}
</style>
