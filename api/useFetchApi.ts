import { tryShowApiError } from './errors/tryShowApiError';
import { useMainStore } from '~/store/main';

export interface IApiResponse<T> {
  data?: T;
  error?: {
    data: any;
    statusCode: number;
  };
}

export default async function useFetchApi<T>(url: string, options = {}): Promise<IApiResponse<T>> {
  const mainStore = useMainStore();

  const reqOptions: any = {
    ...options,

    headers: {
      ...(mainStore.user.token ? { Authorization: `Bearer ${mainStore.user.token}` } : {})
    },
    baseURL: process.client ? mainStore.server.url : mainStore.server.internalUrl
  };

  if (!reqOptions.query) {
    reqOptions.query = {};
  }

  reqOptions.query.mcs = mainStore.server.selectedMCServer;

  try {
    const data = await $fetch<T>(url, reqOptions);

    return {
      data
    };
  } catch (e: any) {
    const data = {
      error: {
        data: e.data,
        statusCode: e.status
      }
    };
    tryShowApiError(data);
    return {
      error: data.error
    };
  }
}
