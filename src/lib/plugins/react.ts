import { LibraryConfig } from '../interfaces/library-config';

/**
 * https://www.npmjs.com/package/eslint-plugin-react
 */
export const react: LibraryConfig = {
  name: 'React',
  order: 'normal',
  plugins: ['react'],
  extendsConfigs: ['plugin:react/recommended'],
  dependencies: ['eslint-plugin-react'],
};

export default react;
