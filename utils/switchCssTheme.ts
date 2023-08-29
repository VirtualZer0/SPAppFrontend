const themeParams = [
  'p1-color',
  'p2-color',
  'el-color',
  'interact-color',
  'p1-color-o',
  'p2-color-o',
  'scroll-track-color',
  'scroll-thumb-color',
  'selection-color'
];

export const switchCssTheme = (to: 'spapp' | 'market' | 'starter' | 'company') => {
  if (!process.client) {
    return;
  }

  const root = document.querySelector(':root');
  const style = getComputedStyle(root as Element);

  themeParams.forEach((param) => {
    const newVal = style.getPropertyValue(`--${to}-${param}`);
    if (newVal) {
      (root as any)?.style.setProperty(`--${param}`, newVal);
    }
  });
};
