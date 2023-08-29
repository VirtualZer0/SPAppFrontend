import Tooltip from 'primevue/tooltip';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import DialogService from 'primevue/dialogservice';
import ru from '~/assets/locale/primevue.json';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true, locale: ru });
  nuxtApp.vueApp.directive('tooltip', Tooltip);
  nuxtApp.vueApp.use(ToastService);
  nuxtApp.vueApp.use(ConfirmationService);
  nuxtApp.vueApp.use(DialogService);
});
