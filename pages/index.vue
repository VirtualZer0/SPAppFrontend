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
  themeColor: '#31ff9c'
});

useMainStore().switchService('spapp');
</script>
