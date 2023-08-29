<template>
  <main class="market-layout layout text-m">
    <MainHeader key="mainHeader">
      <template #nav>
        <NuxtLink>Главная</NuxtLink>
        <NuxtLink>Компании</NuxtLink>
        <NuxtLink>Вакансии</NuxtLink>
      </template>
    </MainHeader>
    <div class="container">
      <slot />
    </div>
  </main>
</template>
<script lang="ts" setup>
import CompanyHeaderLogo from '~/components/logo/CompanyHeaderLogo.vue';
import MainHeader from '~/components/blocks/nav/MainHeader.vue';
import { useMainStore } from '~/store/main';

useMainStore().switchService('wa');

useSeoMeta({
  title: 'Glowberries',
  ogTitle: 'Glowberries',
  ogDescription: 'Сервис для удобного менеджмента ваших компаний и вакансий на СП и СПм',
  description: 'Сервис для удобного менеджмента ваших компаний и вакансий на СП и СПм',
  themeColor: '#4cc9f0',
  ogImage: '/img/market/cover.png',
  twitterCard: 'summary_large_image'
});

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/market/favicon.ico' }]
});
</script>
<style lang="scss" scoped>
.market-layout {
  .container {
    padding: 24px;
    padding-top: 48px;
    max-width: 1600px;
    margin: 0 auto;

    @media (max-width: 640px) {
      padding: 12px;
      padding-top: 48px;
    }
  }
}
</style>
