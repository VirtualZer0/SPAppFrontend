<template>
  <div class="support-crowdfund">
    <div class="form-item">
      <label
        class="label"
        for="input-amount"
      >
        <img
          src="/img/icons/diamond.svg"
          height="24"
          width="24"
          alt="АРы"
        />
        Количество АРов
      </label>
      <InputNumber
        id="input-amount"
        v-model="amount"
        show-buttons
        :step="4"
        :min="1"
        suffix=" АР"
      />
    </div>
    <div class="fast-amount">
      <Button
        size="small"
        outlined
        @click="amount = 10"
      >
        10 АР
      </Button>
      <Button
        size="small"
        outlined
        @click="amount = Math.floor(maxAmount / 4)"
      >
        {{ Math.floor(maxAmount / 4) }} АР
      </Button>
      <Button
        size="small"
        outlined
        @click="amount = Math.floor(maxAmount / 2)"
      >
        {{ Math.floor(maxAmount / 2) }} АР
      </Button>
      <Button
        size="small"
        outlined
        @click="amount = maxAmount"
      >
        {{ maxAmount }} АР
      </Button>
    </div>
    <div class="info">
      Если компания не сможет достичь цели до ее завершения, все
      <img
        src="/img/icons/diamond.svg"
        alt="АРы"
        height="18"
        width="18"
      />
      АРы будут возвращены на ваш счет SP App в полном объеме
    </div>
    <div class="actions">
      <Button @click="sendSupport">Поддержать</Button>
      <Button @click="emits('fail')">Отмена</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { useApi } from '~/api/useApi';
import { useMainStore } from '~/store/main';
import { usePayment } from '~/composables/usePayment';

const mainStore = useMainStore();
const emits = defineEmits(['success', 'fail']);

const inputData = (inject('dialogRef') as any).value?.data;
const maxAmount = inputData.amount <= 0 ? 32 : inputData.amount;
const amount = ref(10);
const destination = ref(inputData.id as number);
const api = useApi().crowd;
const payment = usePayment();

const sendSupport = async () => {
  if (!destination.value || amount.value < 1) {
    emits('fail');
    return;
  }

  const balanceIsOk = await payment.tryRequestPayment(amount.value);

  if (!balanceIsOk) {
    emits('fail');
    return;
  }

  const res = await api.supportCompany(destination.value, { amount: amount.value });
  if (!res.error) {
    emits('success');
  }
};
</script>
<style lang="scss" scoped>
.support-crowdfund {
  .form-item {
    margin-bottom: 12px;
  }

  .fast-amount {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 12px;
  }

  .info {
    font-size: 0.9rem;
    border-left: 3px solid #00b2ff;
    padding-left: 12px;
    margin-bottom: 48px;

    img {
      vertical-align: text-top;
    }
  }
}

.payment-in-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;

  .loader {
    margin-top: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    .spinner {
      font-size: 128px;
      animation: spinner 2.5s linear infinite;
      color: var(--p1-color);
    }

    .ar {
      position: absolute;
      animation: arFloat 1.17s ease-in-out infinite alternate;
      filter: drop-shadow(0px 0px 16px #00b2ff);
    }
  }
}

@keyframes spinner {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes arFloat {
  0% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(10px);
  }
}
</style>
