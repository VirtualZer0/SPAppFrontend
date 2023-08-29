import { useDialog } from 'primevue/usedialog';
import { useMainStore } from '~/store/main';

export const useCrowdfundSupport = () => {
  const mainStore = useMainStore();

  const openSupportWindow = async (id: number, amount = 10) => {
    return await new Promise((resolve, _reject) => {
      useNuxtApp().runWithContext(() => {
        const dialog = useDialog();
        const CrowdfundSupportModal = defineAsyncComponent(() => import('~/components/starter/modal/SupportCrowdfund.vue'));
        const crowdfundModal = dialog.open(CrowdfundSupportModal, {
          props: {
            header: 'Поддержать проект',
            style: {
              width: '480px'
            },
            breakpoints: {
              '640px': '98vw'
            },
            modal: true
          },
          data: {
            id,
            amount
          },
          emits: {
            onSuccess: async () => {
              await mainStore.loadProfile();
              resolve(true);
              crowdfundModal.close();
            },
            onFail: () => {
              resolve(false);
              crowdfundModal.close();
            }
          },

          onClose: () => resolve(false)
        });
      });
    });
  };

  return { openSupportWindow };
};
