import { main } from './endpoints/main';
import { files } from './endpoints/files';
import { payments } from './endpoints/payment';
import { admin } from './endpoints/admin';
import { crowd } from './endpoints/crowd';

export const useApi = () => {
  return {
    main,
    files,
    payments,
    admin,
    crowd
  };
};
