import { useToast } from 'primevue/usetoast';
import { errorMessages } from './errorMessages';
import { ResponseError } from '~/api/enums';

export const tryShowApiError = (data: any): boolean => {
  const error = data?.error;
  if (!error || !process.client) {
    return false;
  } else if (error.statusCode === 403) {
    useNuxtApp().runWithContext(() => {
      const toast = useToast();
      toast.add({
        severity: 'error',
        summary: errorMessages[ResponseError.Forbidden][0],
        detail: errorMessages[ResponseError.Forbidden][1],
        life: 4000
      });
    });
  } else if (error.statusCode === 429) {
    useNuxtApp().runWithContext(() => {
      const toast = useToast();
      toast.add({
        severity: 'error',
        summary: 'Слишком часто!',
        detail: 'Вы отправили слишком много запросов за короткий промежуток времени. Повторите попытку позже.',
        life: 4000
      });
    });
  } else if (error.data && error.data.error) {
    useNuxtApp().runWithContext(() => {
      const toast = useToast();
      toast.add({
        severity: 'error',
        summary: errorMessages[error.data.error as ResponseError][0],
        detail: errorMessages[error.data.error as ResponseError][1],
        life: 4000
      });
    });
  } else if (error.statusCode === undefined) {
    useNuxtApp().runWithContext(() => {
      const toast = useToast();
      toast.add({
        severity: 'error',
        summary: 'Сервер SP App недоступен',
        detail:
          'Не удалось установить связь с нашим сервером. Возможно, проводятся технические работы. Если эта ошибка появляется на протяжении долгого времени, пожалуйста, сообщите @virtualzero в Дискорд-сервере СП или СПм',
        life: 30000
      });
    });
  } else {
    useNuxtApp().runWithContext(() => {
      const toast = useToast();
      toast.add({
        severity: 'error',
        summary: errorMessages[ResponseError.Unknown][0],
        detail: errorMessages[ResponseError.Unknown][1],
        life: 4000
      });
    });

    // eslint-disable-next-line no-console
    console.error('Server error', error.data?.detail);
  }

  return true;
};
