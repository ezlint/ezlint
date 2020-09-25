import { LibraryConfig } from '../interfaces/library-config';

/**
 * https://www.npmjs.com/package/@typescript-eslint/eslint-plugin
 */
export const typescript: LibraryConfig = {
  name: 'Typescript',
  order: 'normal',
  plugins: ['@typescript-eslint'],
  extendsConfigs: ['plugin:@typescript-eslint/recommended'],
  dependencies: [
    'typescript',
    '@typescript-eslint/parser',
    '@typescript-eslint/eslint-plugin',
  ],
};

export default typescript;
