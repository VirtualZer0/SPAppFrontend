import { useDialog } from 'primevue/usedialog';
import { useMainStore } from '~/store/main';

export const usePayment = () => {
  const mainStore = useMainStore();

  const openPaymentWindow = async (amount = 10) => {
    return new Promise((resolve, _reject) => {
      useNuxtApp().runWithContext(() => {
        const dialog = useDialog();
        const CreatePaymentModal = defineAsyncComponent(
          () => import('~/components/blocks/modal/CreatePayment.vue')
        );
        const paymentModal = dialog.open(CreatePaymentModal, {
          props: {
            header: 'Пополнение SP App',
            style: {
              width: '480px',
            },
            breakpoints: {
              '640px': '98vw',
            },
            modal: true,
          },
          data: {
            amount,
          },
          emits: {
            onSuccess: async () => {
              await mainStore.loadProfile();
              resolve(true);
              paymentModal.close();
            },
            onFail: () => {
              resolve(false);
              paymentModal.close();
            },
          },

          onClose: () => resolve(false),
        });
      });
    });
  };

  const tryRequestPayment = async (amount: number): Promise<boolean> => {
    await mainStore.loadProfile();
    if (mainStore.user.isAuthorized && mainStore.userBalance >= amount) {
      return true;
    }

    const res = await openPaymentWindow(amount - mainStore.userBalance);
    if (res) {
      if (mainStore.user.isAuthorized && mainStore.userBalance >= amount) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return { tryRequestPayment, openPaymentWindow };
};
