<template>
  <section class="page payment-page">
    <h1>Пополнение SP App</h1>
    <Card
      v-if="payment || isLoading"
      class="payment-card"
    >
      <template #title>{{ payment ? status[payment.status as PaymentStatus].name : 'Загрузка...' }}</template>
      <template #subtitle>Id {{ payment?.id ?? '...' }}</template>
      <template #content>
        Данная страница закроется автоматически после завершения платежа. Если платеж долгое время не завершается, скопируйте его Id и обратитесь в поддержку.
      </template>
    </Card>
    <div
      v-else
      class="payment-not-found"
    >
      <img
        src="/img/payment-not-found.svg"
        width="200"
      />
      <h2>Платеж не найден</h2>
      <p>Если вы уверены, что это ошибка, обратитесь в поддержку</p>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Card from 'primevue/card';
import { PaymentStatus } from '~/api/enums';
import { useApi } from '~/api/useApi';

const status = {
  [PaymentStatus.Awaiting]: {
    icon: '',
    name: 'Ожидание оплаты'
  },
  [PaymentStatus.Canceled]: {
    icon: '',
    name: 'Платеж отменен'
  },
  [PaymentStatus.Expired]: {
    icon: '',
    name: 'Срок оплаты истек'
  },
  [PaymentStatus.Paid]: {
    icon: '',
    name: 'Оплачен'
  }
};

definePageMeta({
  layout: 'empty'
});

const uuid = useRoute().params.uuid as string;
const payment = ref<MainDto.PaymentDto | null>(null);
const isLoading = ref(true);
let timerId: Number | null = null;

const updatePaymentInfo = async () => {
  const response = await useApi().payments.getPayment(uuid);
  isLoading.value = false;
  payment.value = response.data ?? null;
  if (response.data?.status === PaymentStatus.Paid) {
    (window as any).sendToParent?.(true);
  } else if (response.data?.status !== PaymentStatus.Awaiting) {
    (window as any).sendToParent?.(false);
  }
};

await updatePaymentInfo();

onMounted(() => {
  if (payment.value == null || payment.value.status === PaymentStatus.Awaiting) {
    timerId = window.setInterval(updatePaymentInfo, 1500);
  }
});

onBeforeUnmount(() => window.clearInterval(timerId as any));
</script>
<style lang="scss" scoped>
.payment-page {
  h1 {
    text-align: center;
  }

  .payment-card {
    width: 520px;
    margin: 0 auto;
  }

  .payment-not-found {
    width: 520px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 60vh;

    h2 {
      margin-bottom: 0;
    }
  }
}
</style>
