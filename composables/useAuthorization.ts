import { useConfirm } from 'primevue/useconfirm';
import { useMainStore } from '~/store/main';
import { useDiscordAuth } from '~/utils/thirdparty/useDiscordAuth';

const discordAuth = useDiscordAuth();
let ch: null | BroadcastChannel = null;

const closeCh = () => {
  ch?.close();
  ch = null;
};

export const useAuthorization = () => {
  if (!process.client) {
    return;
  }

  const mainStore = useMainStore();
  const openAuth = (): Promise<boolean> => {
    if (process.client && !ch) {
      ch = discordAuth.createDiscordAuthBC();
    }
    return new Promise<boolean>((resolve, reject) => {
      let authStarted = false;

      const authByCode = async (msg: MessageEvent) => {
        authStarted = true;
        ch?.removeEventListener('message', authByCode);
        if (!msg.data.code) {
          closeCh();
          return resolve(false);
        }

        try {
          await mainStore.authByDiscord({ code: msg.data.code });
          if (mainStore.user.isAuthorized) {
            resolve(true);
          } else {
            resolve(false);
          }
          closeCh();
        } catch (e) {
          reject(e);
        }
      };

      ch?.addEventListener('message', authByCode);
      if (
        !discordAuth.openDiscordAuth('identify', () => {
          if (!authStarted) {
            resolve(false);
            closeCh();
          }
        })
      ) {
        resolve(false);
        closeCh();
      }
    });
  };

  const tryRequestAuth = async (): Promise<boolean> => {
    if (!mainStore.user.isAuthorized) {
      return new Promise((resolve, reject) => {
        useNuxtApp().runWithContext(() => {
          const confirm = useConfirm();
          confirm.require({
            header: 'Требуется авторизация',
            message:
              'Чтобы выполнить это действие, вы должны авторизоваться. Продолжить?',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: async () => {
              try {
                const res = await openAuth();
                resolve(res);
              } catch (e) {
                reject(e);
              }
            },
            reject: () => resolve(false),
            onHide: () => resolve(false),
          });
        });
      });
    }

    return true;
  };

  return { tryRequestAuth, openAuth };
};
