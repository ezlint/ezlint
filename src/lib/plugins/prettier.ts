import { LibraryConfig } from '../interfaces/library-config';

/**
 * https://www.npmjs.com/package/eslint-config-prettier
 */
export const prettierLib: LibraryConfig = {
  name: 'Prettier',
  order: 'late',
  plugins: [],
  extendsConfigs: ['prettier'],
  optionalExtends: [
    {
      if: '@typescript-eslint',
      include: 'prettier/@typescript-eslint',
    },
  ],
  dependencies: ['eslint-config-prettier'],
};

export default prettierLib;
