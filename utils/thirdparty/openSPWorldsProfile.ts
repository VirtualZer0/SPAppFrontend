import { openInNewWindow } from '../openInNewWindow';

export const openSPWorldsProfile = (userName: string) => {
  const mcs = ((useRoute().query.mode as string) ?? 'SP').toLowerCase();
  return openInNewWindow(`https://spworlds.ru/${mcs}/users/${userName}`);
};
