import { useMainStore } from '~/store/main';

/**
 * Open discord authorization window
 * @param scope - Discord scopes
 * @param onClose - Callback for window closing
 * @returns Success of the window opening
 */
const openDiscordAuth = (scope = 'identify', onClose?: () => void): Boolean => {
  const mainStore = useMainStore();
  const authWin = window.open(
    `https://discord.com/oauth2/authorize?response_type=code&client_id=${mainStore.apiCreds.discordClientId}&redirect_uri=${mainStore.apiCreds.discordRedirectUri}&scope=${scope}`
  );

  if (authWin) {
    const closingCheck = setInterval(() => {
      if (authWin.closed) {
        clearInterval(closingCheck);
        onClose?.();
      }
    }, 1000);
    return true;
  } else {
    return false;
  }
};

export const useDiscordAuth = () => {
  /**
   * Creates a channel for the Discord code
   * @returns Created broadcast channel
   */
  const createDiscordAuthBC = () => new BroadcastChannel('discordAuth');
  const sendDiscordCodeToBC = (code: string, ch: BroadcastChannel) => {
    ch.postMessage({ code });
  };

  return {
    createDiscordAuthBC,
    sendDiscordCodeToBC,
    openDiscordAuth
  };
};
