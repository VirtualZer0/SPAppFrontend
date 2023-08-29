<template>
  <div
    v-if="paymentInProgress"
    class="payment-in-progress"
  >
    <div class="loader">
      <svg
        class="spinner"
        width="256"
        height="256"
        viewBox="0 0 800 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M400 31.25C389.65 31.25 381.25 39.65 381.25 50C381.25 60.35 389.65 68.75 400 68.75C582.95 68.775 731.25 217.075 731.25 400.025C731.25 491.5 694.175 574.325 634.225 634.275C630.725 637.675 628.55 642.45 628.55 647.7C628.55 658.05 636.95 666.45 647.3 666.45C652.6 666.45 657.375 664.25 660.775 660.75C727.475 594.025 768.725 501.85 768.725 400.05C768.725 196.4 603.625 31.275 399.975 31.275L400 31.25Z"
          fill="currentColor"
        />
      </svg>

      <img
        src="/img/icons/diamond.svg"
        height="64"
        width="64"
        alt="АРы"
        class="ar"
      />
    </div>
    <div class="title text-xl">Ожидание оплаты</div>
  </div>
  <div
    v-else
    class="create-payment"
  >
    <div class="form-item">
      <label
        class="label"
        for="input-amount"
      >
        <img
          src="/img/icons/diamond.svg"
          alt="АРы"
          height="24"
          width="24"
        />
        Введите количество АРов
      </label>
      <InputNumber
        id="input-amount"
        v-model="amount"
        show-buttons
        :step="8"
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
        @click="amount = 32"
      >
        32 АР
      </Button>
      <Button
        size="small"
        outlined
        @click="amount = 64"
      >
        64 АР
      </Button>
      <Button
        size="small"
        outlined
        @click="amount = 128"
      >
        128 АР
      </Button>
    </div>
    <div class="info">
      Все
      <img
        src="/img/icons/diamond.svg"
        alt="АРы"
        height="18"
        width="18"
      />
      АРы будут зачислены на ваш внутренний счет SP App. Комиссия за ввод и вывод средств отсутствует. Подробнее о работе вашего кошелька вы можете прочитать
      здесь.
    </div>
    <div class="actions">
      <Button @click="createPayment">Пополнить</Button>
      <Button @click="emits('fail')">Отмена</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import { useApi } from '~/api/useApi';
import { useMainStore } from '~/store/main';
import { PaymentStatus } from '~/api/enums';

const mainStore = useMainStore();
const emits = defineEmits(['success', 'fail']);

const inputData = (inject('dialogRef') as any).value?.data;
const amount = ref(inputData.amount ?? 32);
const destination = ref(inputData.destination ?? mainStore.userAccount.id);
const paymentInProgress = ref(false);
const api = useApi().payments;

let payWindow: Window | null = null;
let checkPaymentTimer: Number | null = null;

const checkPaymentStatus = async (paymentId: string) => {
  const payment = await api.getPayment(paymentId);
  if (payment.data?.status === PaymentStatus.Paid) {
    payWindow?.close();
    window.clearInterval(checkPaymentTimer as any);
    emits('success');
  }
};

const createPayment = async () => {
  paymentInProgress.value = true;
  const res = await api.createPayment({
    accountId: destination.value,
    amount: amount.value,
    redirectTo: `${window.location.protocol}//${window.location.host}/payment/[ID]`
  });

  if (!res.error && res.data) {
    payWindow = openInNewWindow(res.data.payUrl);
    (payWindow as any).sendToParent = (result: Boolean) => {
      payWindow?.close();
      window.clearInterval(checkPaymentTimer as any);
      if (result) {
        emits('success');
      } else {
        emits('fail');
      }
    };
    checkPaymentTimer = window.setInterval(() => checkPaymentStatus(res.data?.id ?? ''), 1500);
  } else {
    emits('fail');
  }
};

onBeforeUnmount(() => window.clearInterval(checkPaymentTimer as any));
</script>
<style lang="scss" scoped>
.create-payment {
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
