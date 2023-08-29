<template>
  <section class="latest-crowdfunds">
    <h2 class="section-title">
      <span class="pi pi-flag" />
      Последние сборы
    </h2>
    <div
      v-if="companies && companies?.items.length > 0"
      class="items"
    >
      <CrowdProjectCard
        v-for="company in companies.items"
        :key="company.id"
        class="item"
        :company="company"
        @supported="refresh"
      />
    </div>
    <EmptySection
      v-else
      img="/img/starter/empty-box.svg"
      text="Сейчас активных сборов нет. Станьте первым!"
      show-action
      action-text="Начать сбор"
      action-icon="pi pi-megaphone"
      @action="createCrowdCompany"
    />
  </section>
</template>
<script lang="ts" setup>
import CrowdProjectCard from '~/components/starter/items/CrowdProjectCard.vue';
import { useApi } from '~/api/useApi';
import EmptySection from '~/components/blocks/placeholders/EmptySection.vue';

const createCrowdCompany = () => {
  useRouter().push('/starter/create');
};

const api = useApi().crowd;

const loadLatestCompanies = async () => {
  const apiRes = await api.getCompanies(0, 14, 'dateDesc', 'active');
  if (apiRes.data) {
    return apiRes.data;
  }
};

const { data: companies, refresh } = await useAsyncData(() => loadLatestCompanies());

watch(
  () => useRoute().query.mode,
  async () => await refresh()
);
</script>
<style lang="scss" scoped>
.latest-crowdfunds {
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  @media (max-width: 1024px) {
    .items {
      display: flex;
      flex-wrap: wrap;
    }
    .item {
      min-width: 100%;
      flex: 1;
    }
  }
}
</style>
