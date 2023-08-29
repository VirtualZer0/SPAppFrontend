<template>
  <section class="page admin-users-page">
    <h2>Пользователи</h2>
    <Toolbar>
      <template #start>
        <div class="flex-line-l">
          <div class="flex-line">
            Сортировать по:
            <Dropdown
              v-model="filter.sort"
              :options="sortVariants"
              option-label="name"
              option-value="value"
              @change="loadUsers"
            />
          </div>
          <div class="flex-line">
            Поиск:
            <InputText
              v-model="filter.search"
              type="search"
            />
            <Button
              icon="pi pi-search"
              @click="loadUsers"
            />
          </div>
        </div>
      </template>
    </Toolbar>
    <DataTable
      v-if="users?.items"
      :value="users.items"
      :loading="isLoading"
      class="user-table p-datatable-sm"
    >
      <Column
        field="id"
        header="Id"
      />
      <Column header="Скин">
        <template #body="{ data }">
          <img
            lazy
            height="32"
            :src="getMinecraftAvatar(data.minecraftUuid, 'face', 32)"
          />
        </template>
      </Column>
      <Column
        field="userName"
        header="Никнейм"
      />
      <Column
        field="discordName"
        header="Ник в Discord"
      />
      <Column header="Баланс">
        <template #body="{ data }">
          <div class="balance">
            <span class="sp">{{ data.accounts[MCServer.SP].balance }} АР <sup>СП</sup></span> /
            <span class="spm">{{ data.accounts[MCServer.SPM].balance }} АР <sup>СПм</sup></span>
          </div>
        </template>
      </Column>

      <Column header="Последняя активность">
        <template #body="{ data }">
          {{ dayjs(data.latestActivity + 'Z').format('DD.MM.YYYY HH:mm') }}
        </template>
      </Column>

      <Column header="Дата регистрации">
        <template #body="{ data }">
          {{ dayjs(data.createdAt + 'Z').format('DD.MM.YYYY HH:mm') }}
        </template>
      </Column>

      <Column header="Действия">
        <template> </template>
      </Column>
    </DataTable>

    <Paginator
      v-if="users"
      :total-records="users.count"
      :rows="filter.count"
      :rows-per-page-options="[10, 25, 50]"
      @page="setPage"
    />
  </section>
</template>
<script lang="ts" setup>
import DataTable from 'primevue/datatable';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmDialog from 'primevue/confirmdialog';
import InputText from 'primevue/inputtext';
import Paginator, { PageState } from 'primevue/paginator';
import Dropdown from 'primevue/dropdown';
import Toolbar from 'primevue/toolbar';
import Column from 'primevue/column';
import dayjs from 'dayjs';
import { useApi } from '~/api/useApi';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';
import { MCServer } from '~/api/enums';
import { useMainStore } from '~/store/main';

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
});

const users = ref<null | MainDto.ItemList<MainDto.UserProfileDto>>(null);
const isLoading = ref(true);
const filter = ref({
  from: 0,
  count: 25,
  sort: 'default',
  search: undefined
});

const sortVariants = [
  { name: 'Умолчанию', value: 'default' },
  { name: 'Алфавиту, возр.', value: 'abcAsc' },
  { name: 'Алфавиту, убыв.', value: 'abcDesc' }
];

const setPage = async (e: PageState) => {
  filter.value.count = e.rows;
  filter.value.from = e.page * filter.value.count;
  await loadUsers();
};

watch(
  () => useMainStore().server.selectedMCServer,
  async () => {
    await loadUsers();
  }
);

const loadUsers = async () => {
  isLoading.value = true;
  const usersRes = await useApi().admin.getUsers(filter.value.from, filter.value.count, filter.value.sort as any, filter.value.search);
  if (usersRes.data) {
    users.value = usersRes.data;
  }

  isLoading.value = false;
};

onMounted(async () => {
  await loadUsers();
});
</script>
<style lang="scss" scoped>
.admin-users-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    margin-bottom: 0;
  }

  .loading {
    margin-top: 20vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    .pi {
      animation: rotation 1s linear infinite;
    }
  }
  .balance {
    .sp {
      color: var(--p1-color);
    }

    .spm {
      color: var(--p2-color);
    }
  }
}
</style>
