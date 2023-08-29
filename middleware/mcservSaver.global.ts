import { MCServer } from '~/api/enums';

export default defineNuxtRouteMiddleware((to, from) => {
  if (to.query.mode) {
    return;
  }

  const mode = from.query.mode || (useCookie<MCServer>('preferedServer').value === MCServer.SP ? 'SP' : 'SPM') || 'SP';
  to.query.mode = mode;
  return navigateTo(to);
});
