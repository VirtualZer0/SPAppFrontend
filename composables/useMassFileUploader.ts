import { useApi } from '~/api/useApi';

const uploader = async (files: Array<File | string | null>) => {
  const api = useApi().files;
  const uploadArr: File[] = [];
  files.forEach((file) => {
    if (file !== null && typeof file !== 'string') {
      uploadArr.push(file);
    }
  });

  if (uploadArr.length > 0) {
    return await api.upload(uploadArr);
  }
};

export const useMassFileUploader = () => ({ uploader });
