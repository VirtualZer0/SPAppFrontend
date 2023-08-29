<template>
  <section class="page profile-page">
    <aside class="left-menu">
      <h2>Мой аккаунт</h2>
      <PanelMenu
        :model="menu"
        class="panel-menu"
      >
        <template #headericon="{ item }">
          <img
            v-if="item.icon"
            style="margin-right: 12px; padding: 0"
            :src="`/img/${item.icon}`"
            height="42"
          />
        </template>
      </PanelMenu>
    </aside>
    <NuxtPage />
  </section>
</template>
<script lang="ts" setup>
import PanelMenu from 'primevue/panelmenu';
import { useMainStore } from '~/store/main';

const mainStore = useMainStore();

definePageMeta({
  middleware: 'auth'
});

const menu = [
  { label: 'Общая информация', to: '/profile/main', icon: 'logo/logo-dark.svg' },
  { label: 'Мои заказы', to: '/profile/orders', icon: 'market/logo-dark.svg' },
  { label: 'Мой магазин', to: '/profile/shop/main', icon: 'market/logo-dark.svg' },
  { label: 'Мои сборы', to: '/profile/crowdfunding', icon: 'starter/logo-dark.svg' }
];

if (useRoute().fullPath === '/profile') {
  useRouter().push('/profile/main');
}
</script>
<style lang="scss" scoped>
.profile-page {
  display: flex;
  gap: 32px;
  .left-menu {
    min-width: 360px;
  }

  .panel-menu:deep(.p-panelmenu-header-action) {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
  }

  .inline-page {
    width: 100%;
  }
}
</style>
