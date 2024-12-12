import dayjs from 'dayjs';
import useFetchApi from '../useFetchApi';

export const main = {
  init: async () => {
    return useFetchApi<MainDto.InitialDto>('/app/init');
  },

  authByDiscord: async (data: MainDto.AuthByDiscordDto) => {
    return useFetchApi<MainDto.TokenDto>(`/auth/discord`, {
      method: 'POST',
      body: data,
    });
  },

  getMyProfile: async () => {
    return useFetchApi<MainDto.UserProfileDto>('/user/me');
  },
};
