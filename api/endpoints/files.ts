import useFetchApi from '~/api/useFetchApi';

export const files = {
  upload: async (data: File[]) => {
    const formData = new FormData();
    for (let i = 0; i < data.length; i++) {
      formData.append(`file-${i}`, data[i]);
    }
    return await useFetchApi<MainDto.FileInfoDto[]>('/files/upload', {
      method: 'POST',
      body: formData
    });
  }
};
