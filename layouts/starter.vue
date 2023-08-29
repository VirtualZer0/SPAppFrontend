<template>
  <main class="starter-layout layout text-m">
    <MainHeader key="mainHeader">
      <template #nav>
        <NuxtLink
          v-for="item in menu"
          :key="item.name"
          :to="item.link"
          >{{ item.name }}</NuxtLink
        >
      </template>
    </MainHeader>
    <div class="container">
      <slot />
    </div>
    <BottomMenu :menu="menu" />
  </main>
</template>
<script lang="ts" setup>
import MainHeader from '~/components/blocks/nav/MainHeader.vue';
import { useMainStore } from '~/store/main';
import BottomMenu from '~/components/blocks/nav/BottomMenu.vue';

useMainStore().switchService('starter');

useSeoMeta({
  title: 'Starter',
  ogTitle: 'Starter',
  ogDescription: 'Краундфандинговая платформа для сбора АРов на ваши проекты СП и СПм',
  description: 'Краундфандинговая платформа для сбора АРов на ваши проекты СП и СПм',
  ogSiteName: 'SPApp Starter',
  ogImage: '/img/starter/cover.png',
  twitterCard: 'summary_large_image',
  themeColor: '#ff0054'
});

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/starter/favicon.ico' }]
});

const menu = [
  { name: 'Главная', icon: 'pi-home', link: '/starter' },
  { name: 'Все сборы', icon: 'pi-list', link: '/starter/all' },
  { name: 'Мои сборы', icon: 'pi-money-bill', link: '/starter/my' }
];
</script>
<style lang="scss" scoped>
.starter-layout {
  .container {
    padding: 24px;
    padding-top: 24px;
    max-width: 1600px;
    margin: 0 auto;

    @media (max-width: 640px) {
      padding: 8px;
      padding-top: 16px;
    }
  }
}
</style>
