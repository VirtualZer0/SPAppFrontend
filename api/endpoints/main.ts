import dayjs from 'dayjs';
import useFetchApi from '../useFetchApi';

export const main = {
  init: async () => {
    return await useFetchApi<MainDto.InitialDto>('/app/init');
  },

  authByDiscord: async (data: MainDto.AuthByDiscordDto) => {
    return await useFetchApi<MainDto.TokenDto>(`/auth/discord`, {
      method: 'POST',
      body: data
    });
  },

  getMyProfile: async () => {
    return await useFetchApi<MainDto.UserProfileDto>('/user/me');
  }
};
