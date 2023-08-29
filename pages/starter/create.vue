<template>
  <section class="page starter-create-page">
    <h1>Создание нового сбора</h1>
    <CrowdfundEditor />
  </section>
</template>
<script lang="ts" setup>
import CrowdfundEditor from '~/components/starter/blocks/crowdfund/CrowdfundEditor.vue';
import { useMainStore } from '~/store/main';

definePageMeta({
  layout: 'starter',
  middleware: 'auth'
});

const mainStore = useMainStore();

if (!mainStore.user.isAuthorized) {
  useRouter().replace('/starter');
}
</script>
<style lang="scss" scoped>
.starter-create-page {
  h1 {
    margin-bottom: 32px;
  }
}
</style>
