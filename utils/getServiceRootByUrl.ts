export const getServiceRootByLayout = (layout: string) => {
  switch (layout) {
    case 'starter':
      return '/starter';
    case 'company':
      return '/wa';
    case 'admin':
      return '/admin';
    default:
      return '/';
  }
};
