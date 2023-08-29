<template>
  <main class="company-layout layout text-m">
    <MainHeader key="mainHeader">
      <template #logo>
        <CompanyHeaderLogo />
      </template>
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
  title: 'WorkAssist',
  ogTitle: 'WorkAssist',
  ogDescription: 'Сервис для удобного менеджмента ваших компаний и вакансий на СП и СПм',
  description: 'Сервис для удобного менеджмента ваших компаний и вакансий на СП и СПм',
  themeColor: '#4cc9f0'
});

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/img/company/favicon.ico' }]
});
</script>
<style lang="scss" scoped>
.company-layout {
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
