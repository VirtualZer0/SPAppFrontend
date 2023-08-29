import { useMainStore } from '~/store/main';

export const getUploadedFile = (url: string | null | undefined, placeholder = '') => {
  if (url) {
    return `${useMainStore().server.url}/static/uploads/${url}`;
  } else {
    return placeholder;
  }
};
