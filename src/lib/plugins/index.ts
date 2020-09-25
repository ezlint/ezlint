import jestLib from './jest';
import prettierLib from './prettier';
import reactLib from './react';
import reactHooksLib from './react-hooks';
import typescriptLib from './typescript';

export const list = [
  jestLib,
  prettierLib,
  reactLib,
  reactHooksLib,
  typescriptLib,
];

export default {
  jest: jestLib,
  prettier: prettierLib,
  react: reactLib,
  reactHooks: reactHooksLib,
  typescript: typescriptLib,
};
