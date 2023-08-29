<template>
  <section class="page index-page">
    <Welcome />
    <OurServices />
  </section>
</template>
<script lang="ts" setup>
import Welcome from '~/components/blocks/other/Welcome.vue';
import OurServices from '~/components/blocks/other/OurServices.vue';
import { switchCssTheme } from '~/utils/switchCssTheme';
import { useMainStore } from '~/store/main';

definePageMeta({
  layout: 'default'
});

useHead({
  link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
});

useSeoMeta({
  title: 'SP App',
  ogTitle: 'SP App',
  ogDescription: 'Единая экосистема сервисов для СП и СПм',
  description: 'Единая экосистема сервисов для СП и СПм',
  themeColor: '#33FF9C',
  ogImage: '/img/cover.png',
  twitterCard: 'summary_large_image'
});

useSeoMeta({
  themeColor: '#31ff9c'
});

useMainStore().switchService('spapp');
</script>
