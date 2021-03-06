import { LibraryConfig } from '../interfaces/library-config';

/**
 * https://www.npmjs.com/package/eslint-plugin-jest
 */
export const jestLib: LibraryConfig = {
  name: 'Jest',
  order: 'normal',
  plugins: ['jest'],
  extendsConfigs: ['ezlint/jest', 'plugin:jest/recommended'],
  dependencies: ['eslint-plugin-jest'],
};

export default jestLib;
