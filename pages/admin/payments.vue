<template>
  <section class="page admin-payments-page">
    <h2>Платежи</h2>
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
              @change="loadPayments"
            />
          </div>
          <div class="flex-line">
            Id пользователя:
            <InputText
              v-model="filter.userId"
              type="search"
            />
            <Button
              icon="pi pi-search"
              @click="loadPayments"
            />
          </div>
          <div class="flex-line">
            Статус:
            <Dropdown
              v-model="filter.filter"
              :options="filterVariants"
              option-label="name"
              option-value="value"
              @change="loadPayments"
            />
          </div>
        </div>
      </template>
    </Toolbar>
    <DataTable
      v-if="payments?.items"
      :value="payments.items"
      :loading="isLoading"
      class="payment-table p-datatable-sm"
    >
      <Column header="Инициатор">
        <template #body="{ data }">
          <div class="flex-line">
            <img
              :src="getMinecraftAvatar(data.user.minecraftUuid, 'face', 32)"
              lazy
              height="32"
            />
            <span>{{ data.user.userName }}</span>
          </div>
        </template>
      </Column>

      <Column header="Id">
        <template #body="{ data }">
          <small>{{ data.id }}</small>
        </template>
      </Column>

      <Column header="Статус">
        <template #body="{ data }">
          <span :style="`color: ${statuses[data.status as PaymentStatus][1]}`">
            {{ statuses[data.status as PaymentStatus][0] }}
          </span>
        </template>
      </Column>

      <Column header="Сумма">
        <template #body="{ data }">
          <div class="flex-line">
            {{ data.amount }}
            <img
              src="/img/icons/diamond.svg"
              height="21"
            />
          </div>
        </template>
      </Column>

      <Column header="Дата">
        <template #body="{ data }">
          {{ dayjs(data.createdAt + 'Z').format('DD.MM.YYYY HH:mm') }}
        </template>
      </Column>

      <Column header="Оплатил">
        <template #body="{ data }">
          {{ data.payer || '-' }}
        </template>
      </Column>

      <Column header="Действия">
        <template #body="{ data }">
          <div class="flex-line-s">
            <Button
              v-tooltip.left="'Открыть страницу оплаты'"
              icon="pi pi-window-maximize"
              severity="info"
              size="small"
              class="mini-button"
              @click="openInNewWindow(data.payUrl)"
            />
            <Button
              v-if="data.status == PaymentStatus.Awaiting"
              v-tooltip.left="'Подтвердить платеж'"
              severity="warning"
              icon="pi pi-check"
              size="small"
              class="mini-button"
              @click="approvePayment(data.id)"
            />
          </div>
        </template>
      </Column>
    </DataTable>

    <Paginator
      v-if="payments"
      :total-records="payments.count"
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
import { useConfirm } from 'primevue/useconfirm';
import { useApi } from '~/api/useApi';
import { getMinecraftAvatar } from '~/utils/thirdparty/getMinecraftAvatar';
import { MCServer, PaymentStatus } from '~/api/enums';
import { useMainStore } from '~/store/main';
import { openInNewWindow } from '~/utils/openInNewWindow';

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
});

const confirm = useConfirm();

const payments = ref<null | MainDto.ItemList<MainDto.PaymentDto>>(null);
const isLoading = ref(true);
const filter = ref({
  from: 0,
  count: 25,
  sort: 'default',
  userId: undefined,
  filter: 'default'
});

const sortVariants = [
  { name: 'Умолчанию', value: 'default' },
  { name: 'Дате, возр.', value: 'dateAsc' },
  { name: 'Дате, убыв.', value: 'dateDesc' },
  { name: 'Сумме, возр.', value: 'amountAsc' },
  { name: 'Сумме, убыв.', value: 'amountDesc' },
  { name: 'Статусу, возр.', value: 'statusAsc' },
  { name: 'Статусу, убыв.', value: 'statusDesc' }
];

const filterVariants = [
  { name: 'Все', value: 'default' },
  { name: 'В ожидании', value: PaymentStatus.Awaiting },
  { name: 'Отмененные', value: PaymentStatus.Canceled },
  { name: 'Просроченные', value: PaymentStatus.Expired },
  { name: 'Завершенные', value: PaymentStatus.Paid }
];

const statuses: Record<PaymentStatus, string[]> = {
  [PaymentStatus.Awaiting]: ['В ожидании', 'var(--p2-color)'],
  [PaymentStatus.Canceled]: ['Отменен', 'var(--danger-color)'],
  [PaymentStatus.Expired]: ['Просрочен', '#FF9800'],
  [PaymentStatus.Paid]: ['Выполнен', 'var(--p1-color)']
};

const setPage = async (e: PageState) => {
  filter.value.count = e.rows;
  filter.value.from = e.page * filter.value.count;
  await loadPayments();
};

const approvePayment = (paymentId: string) => {
  confirm.require({
    header: 'Внимание!',
    message:
      'Подтверждение платежа означает, что SP App незамедлительно начислит указанную сумму на счет пользователя без ожидания реального перевода от SPWorlds. Используйте данный функционал с осторожностью и только для целей тестирования. Вы уверены, что хотите продолжить?',
    accept: async () => {
      await useApi().admin.editPayment(paymentId, {
        status: PaymentStatus.Paid
      });
      await loadPayments();
    }
  });
};

watch(
  () => useMainStore().server.selectedMCServer,
  async () => {
    await loadPayments();
  }
);

const loadPayments = async () => {
  isLoading.value = true;
  const paymentsRes = await useApi().admin.getPayments(
    filter.value.from,
    filter.value.count,
    filter.value.sort as any,
    filter.value.userId,
    filter.value.filter as any
  );
  if (paymentsRes.data) {
    payments.value = paymentsRes.data;
  }

  isLoading.value = false;
};

onMounted(async () => {
  await loadPayments();
});
</script>
<style lang="scss" scoped>
.admin-payments-page {
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
