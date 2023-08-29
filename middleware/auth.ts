import { useMainStore } from '~/store/main';
import { useAuthorization } from '~/composables/useAuthorization';
import { getServiceRootByLayout } from '~/utils/getServiceRootByUrl';

export default defineNuxtRouteMiddleware((to, from) => {
  const mainStore = useMainStore();
  if (!mainStore.user.isAuthorized && !useCookie('token').value) {
    if (process.client) {
      const auth = useAuthorization();
      auth?.tryRequestAuth().then((res) => {
        if (!res) {
          return;
        }

        useRouter().push(to);
      });
    }

    const rootPath = getServiceRootByLayout(to.meta.layout as string);
    if (to.fullPath === from.fullPath && to.path !== rootPath) {
      return navigateTo(rootPath);
    } else if (to.path === rootPath) {
      return;
    }

    return abortNavigation();
  }
});
