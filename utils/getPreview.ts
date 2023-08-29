import { useMainStore } from '~/store/main';

export const getPreview = (part: string, id: number, date: any = 0) => {
  return `${useMainStore().server.url}/static/previews/${part}/${id}.webp?${date}`;
};
