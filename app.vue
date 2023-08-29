<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <DynamicDialog />
    <ConfirmDialog style="max-width: 640px" />
    <Toast />
  </div>
</template>
<script lang="ts" setup>
import ConfirmDialog from 'primevue/confirmdialog';
import DynamicDialog from 'primevue/dynamicdialog';
import Toast from 'primevue/toast';
import { MCServer } from '~/api/enums';
import { useMainStore } from '~/store/main';

const desc = 'Единая экосистема сервисов для СП и СПм';
const mainStore = useMainStore();

useSeoMeta({
  description: desc,
  ogDescription: desc
});

const mainClass = computed(() => `${mainStore.server.currentService}-service`);

useHead({
  htmlAttrs: {
    class: mainClass
  }
});

const route = useRoute();

useAsyncData('appInitialized', async () => {
  switch (route.query.mode) {
    case 'SP':
      mainStore.switchMCServer(MCServer.SP);
      break;

    case 'SPM':
      mainStore.switchMCServer(MCServer.SPM);
      break;
  }

  await mainStore.init();
  return true;
});
</script>
