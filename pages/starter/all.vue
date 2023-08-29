<template>
  <section class="page all-crowd-page">
    <h1>Все сборы</h1>
    <Toolbar class="toolbar">
      <template #start>
        <div class="flex-line-l">
          <div class="flex-line filter-param">
            Сортировать по:
            <Dropdown
              v-model="query.sort"
              :options="sortVariants"
              option-label="name"
              option-value="value"
              @change="refresh"
            />
          </div>
          <div class="flex-line filter-param">
            Показывать:
            <Dropdown
              v-model="query.filter"
              :options="filterVariants"
              option-label="name"
              option-value="value"
              @change="refresh"
            />
          </div>
        </div>
      </template>
      <template #end>
        <span class="actions">
          <NuxtLink to="/starter/create">
            <Button
              label="Создать сбор"
              icon="pi pi-megaphone"
            />
          </NuxtLink>
        </span>
      </template>
    </Toolbar>

    <div
      v-if="companies && companies.items.length > 0"
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
      class="empty"
      img="/img/starter/stars.svg"
      text="Здесь сейчас пусто"
    />
    <Paginator
      v-if="companies && companies.count > 0"
      :total-records="companies.count"
      :rows="query.count"
      :rows-per-page-options="[10, 24, 50]"
      @page="setPage"
    />
  </section>
</template>
<script lang="ts" setup>
import Toolbar from 'primevue/toolbar';
import Dropdown from 'primevue/dropdown';
import Paginator, { PageState } from 'primevue/paginator';
import Button from 'primevue/button';
import CrowdProjectCard from '~/components/starter/items/CrowdProjectCard.vue';
import EmptySection from '~/components/blocks/placeholders/EmptySection.vue';
import { useApi } from '~/api/useApi';

const api = useApi().crowd;

definePageMeta({
  layout: 'starter'
});

const query = ref({
  from: 0,
  count: 24,
  sort: 'dateDesc',
  filter: 'all'
});

const sortVariants = [
  { name: 'Дате, возр.', value: 'dateAsc' },
  { name: 'Дате, убыв.', value: 'dateDesc' },
  { name: 'Собрано, возр', value: 'amountAsc' },
  { name: 'Собрано, убыв', value: 'amountDesc' }
];

const filterVariants = [
  { name: 'Все', value: 'all' },
  { name: 'Завершенные', value: 'over' },
  { name: 'Отмененные', value: 'cancelled' },
  { name: 'Активные', value: 'active' }
];

const loadCompanies = async () => {
  const res = await api.getCompanies(query.value.from, query.value.count, query.value.sort as any, query.value.filter as any, undefined, true);

  if (!res.error && res.data) {
    return res.data;
  }
};

const setPage = async (e: PageState) => {
  query.value.count = e.rows;
  query.value.from = e.page * query.value.count;
  await refresh();
};

const { data: companies, refresh } = await useAsyncData(() => loadCompanies());

watch(
  () => useRoute().query.mode,
  async () => await refresh()
);
</script>
<style lang="scss" scoped>
.all-crowd-page {
  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
    margin-bottom: 24px;
  }

  .empty {
    margin-bottom: 24px;
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

    &:deep(.p-toolbar-group-end) {
      width: 100%;
    }
  }
}
</style>
