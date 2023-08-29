<template>
  <main class="admin-layout layout text-m">
    <MainHeader key="mainHeader" />
    <div class="container">
      <aside class="left-menu">
        <h3>Панель управления</h3>
        <PanelMenu
          :model="menu"
          class="panel-menu"
        >
        </PanelMenu>
      </aside>
      <slot />
    </div>
  </main>
</template>
<script lang="ts" setup>
import PanelMenu from 'primevue/panelmenu';
import { useMainStore } from '~/store/main';
import MainHeader from '~/components/blocks/nav/MainHeader.vue';

useMainStore().switchService('spapp');

useSeoMeta({
  title: 'Панель управления SP App',
  themeColor: '#33ff9c'
});

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
});

const menu = [
  { label: 'Общая информация', to: '/admin', icon: 'pi pi-desktop' },
  { label: 'Пользователи', to: '/admin/users', icon: 'pi pi-user' },
  { label: 'Платежи', to: '/admin/payments', icon: 'pi pi-money-bill' },
  { label: 'Транзакции', to: '/profile/crowdfunding', icon: 'pi pi-credit-card' }
];
</script>
<style lang="scss" scoped>
.admin-layout {
  background: url('/img/fx/headerfx.png') no-repeat;
  background-size: 80%;
  min-height: 360px;

  .container {
    padding: 24px;
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    gap: 48px;
  }

  .panel-menu:deep(.p-panelmenu-header-action) {
    padding-top: 12px !important;
    padding-bottom: 12px !important;
  }

  .left-menu {
    min-width: 240px;
  }
}
</style>
