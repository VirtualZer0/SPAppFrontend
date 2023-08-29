<template>
  <section class="page starter-create-page">
    <h1>Редактирование сбора</h1>
    <CrowdfundEditor
      v-if="company"
      edit-mode
      :cur-company="company"
      @cancel="router.push(`/starter/crowdcompany/${id}`)"
    />
  </section>
</template>
<script lang="ts" setup>
import { useApi } from '~/api/useApi';
import CrowdfundEditor from '~/components/starter/blocks/crowdfund/CrowdfundEditor.vue';
import { useMainStore } from '~/store/main';

const api = useApi().crowd;
const id = parseInt(useRoute().params.id);
const router = useRouter();

definePageMeta({
  layout: 'starter',
  middleware: 'auth'
});

const mainStore = useMainStore();

if (!mainStore.user.isAuthorized) {
  useRouter().replace('/starter');
}

watch(
  () => useRoute().query.mode,
  () => useRouter().push('/starter')
);

const loadCompany = async () => {
  const res = await api.getCompany(id);

  if (!res.error && res.data) {
    return res.data;
  }
};

const { data: company, refresh } = await useAsyncData(() => loadCompany());
</script>
<style lang="scss" scoped>
.starter-create-page {
  h1 {
    margin-bottom: 32px;
  }
}
</style>
