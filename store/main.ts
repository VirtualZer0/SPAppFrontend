import { defineStore } from 'pinia';
import { useApi } from '~/api/useApi';
import { MCServer, ResponseError, Role } from '~/api/enums';

type ServiceId = 'spapp' | 'wa' | 'market' | 'starter';

interface MainStoreState {
  apiCreds: {
    discordClientId: string;
    discordRedirectUri: string;
  };

  user: MainDto.UserProfileDto & {
    isAuthorized: boolean;
    token: string;
    minecraftUuid: string | null;
  };

  server: {
    offline: boolean;
    url: string;
    internalUrl: string;
    selectedMCServer: MCServer;
    currentService: ServiceId;
  };
}

export const useMainStore = defineStore('main', {
  state: (): MainStoreState => ({
    apiCreds: {
      discordClientId: '',
      discordRedirectUri: ''
    },

    user: {
      id: -1,
      token: '',
      userName: '',
      discordName: '',
      accounts: {},
      minecraftUuid: '',
      roles: [],
      isAuthorized: false
    },

    server: {
      offline: false,
      url: '',
      internalUrl: '',
      selectedMCServer: MCServer.SP,
      currentService: 'spapp'
    }
  }),

  actions: {
    async init() {
      useNuxtApp().runWithContext(() => {
        this.server.url = useRuntimeConfig().public.backendUrl;
        this.server.internalUrl = useRuntimeConfig().public.internalUrl;
        const preferedServer = useCookie('preferedServer');
        const mode = useRoute().query.mode;

        if (mode) {
          const selectedServer = mode === 'SP' ? MCServer.SP : MCServer.SPM;
          this.server.selectedMCServer = selectedServer;
          preferedServer.value = selectedServer.toString();
        } else if (preferedServer.value) {
          this.server.selectedMCServer = parseInt(preferedServer.value);
        }

        const token = useCookie('token');
        if (token?.value) {
          this.user.token = token.value;
        }
      });

      const api = useApi();
      const response = await api.main.init();

      if (response.data) {
        this.apiCreds.discordClientId = response.data.discordClientId ?? '';
        this.apiCreds.discordRedirectUri = response.data.discordRedirectUri ?? '';
        this.setServerOffline(false);

        if (this.user.token) {
          await this.loadProfile();
        }
      } else if (process.client) {
        this.setServerOffline(true);
        setTimeout(async () => await this.init(), 2000);
      }
    },

    async authByDiscord(data: MainDto.AuthByDiscordDto) {
      const api = useApi().main;
      const res = await api.authByDiscord(data);

      if (!res.error && res.data) {
        this.user.token = res.data.token;
        const cookie = useCookie('token', {
          maxAge: res.data.expires * 60
        });
        cookie.value = this.user.token;
        await this.loadProfile();
      } else {
        return res;
      }
    },

    async loadProfile(): Promise<boolean> {
      const api = useApi().main;
      const res = await api.getMyProfile();

      if (!res.error || res.error.data.error === ResponseError.ServerNotAvailable) {
        this.user = {
          ...this.user,
          ...res.data,
          isAuthorized: true
        };

        return true;
      } else if (res.error.data.error === ResponseError.Forbidden) {
        // Authorization needed
        return false;
      } else {
        throw res.error;
      }
    },

    setServerOffline(isOffline = false) {
      this.server.offline = isOffline;
    },

    switchMCServer(serv: MCServer) {
      useNuxtApp().runWithContext(() => {
        const preferedServer = useCookie('preferedServer', {
          maxAge: 10 * 365 * 24 * 60 * 60
        });

        preferedServer.value = serv.toString();

        const route = useRoute();
        const mode = serv === MCServer.SP ? 'SP' : 'SPM';
        useRouter().replace({ path: route.path, query: { ...route.query, mode } });
      });
      this.server.selectedMCServer = serv;
    },

    switchService(service: ServiceId) {
      this.server.currentService = service;
    },

    logout() {
      this.user.isAuthorized = false;
    }
  },

  getters: {
    isEmployee(state) {
      return state.user.roles.some((role) => {
        const curRole = parseInt(role);
        return curRole === Role.Admin || curRole === Role.WorkerDelivery || curRole === Role.WorkerSupport;
      });
    },

    isAdmin(state) {
      return state.user.roles.some((role) => {
        const curRole = parseInt(role);
        return curRole === Role.Admin || curRole === Role.Superadmin;
      });
    },

    userBalance(state) {
      return state.user.accounts[state.server.selectedMCServer]?.balance ?? 0;
    },

    userAccount(state) {
      return state.user.accounts[state.server.selectedMCServer];
    }
  }
});
