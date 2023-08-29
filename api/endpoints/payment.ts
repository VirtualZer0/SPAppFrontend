import useFetchApi from '../useFetchApi';

export const payments = {
  getPayment: async (uuid: string) => {
    return await useFetchApi<MainDto.PaymentDto>(`/payments/topup/${uuid}`);
  },

  createPayment: async (dto: MainDto.CreatePaymentDto) => {
    return await useFetchApi<MainDto.PaymentDto>('/payments/create', {
      method: 'POST',
      body: dto
    });
  }
};
