import { LibraryConfig } from '../interfaces/library-config';

/**
 * https://www.npmjs.com/package/eslint-plugin-react-hooks
 */
export const reactHooksLib: LibraryConfig = {
  name: 'React-Hooks',
  order: 'normal',
  plugins: ['react-hooks'],
  extendsConfigs: ['plugin:react-hooks/recommended'],
  dependencies: ['eslint-plugin-react-hooks'],
};

export default reactHooksLib;
