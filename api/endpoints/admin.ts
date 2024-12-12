import { PaymentStatus } from 'api/enums';
import useFetchApi from '~/api/useFetchApi';

export const admin = {
  getMainStat: async () => {
    return useFetchApi<AdminDto.MainStatDto>('/admin/statistic');
  },

  getUsers: async (
    from = 0,
    count = 25,
    sort: 'abcAsc' | 'abcDesc' | 'default' = 'default',
    search?: string
  ) => {
    return useFetchApi<MainDto.ItemList<MainDto.UserProfileDto>>(
      '/admin/users',
      {
        query: { from, count, sort, search },
      }
    );
  },

  getPayments: async (
    from = 0,
    count = 25,
    sort:
      | 'dateAsc'
      | 'dateDesc'
      | 'amountAsc'
      | 'amountDesc'
      | 'statusAsc'
      | 'statusDesc'
      | 'default' = 'default',
    userId?: Number | '',
    filter?: PaymentStatus | 'default'
  ) => {
    if (userId === '') {
      userId = undefined;
    }

    if (filter === 'default') {
      filter = undefined;
    }

    return useFetchApi<MainDto.ItemList<MainDto.PaymentDto>>(
      '/admin/payments',
      {
        query: { from, count, sort, userId, filter },
      }
    );
  },

  editPayment: async (paymentId: String, data: AdminDto.EditPaymentDto) => {
    return useFetchApi<MainDto.PaymentDto>(`/admin/payments/${paymentId}`, {
      method: 'PUT',
      body: data,
    });
  },
};
