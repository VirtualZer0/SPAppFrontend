export const openInNewWindow = (url: string): Window | null => {
  const win = window.open(url, '_blank');
  win?.focus();
  return win;
};
