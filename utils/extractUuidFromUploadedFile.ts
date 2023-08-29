export const extractUuidFromUploadedFile = (path: string) => {
  if (!path.includes('/') && !path.includes('.')) {
    return path;
  }
  const lastPart = path.split('/').slice(-1)[0];
  return lastPart.split('.').slice(-2)[0];
};
