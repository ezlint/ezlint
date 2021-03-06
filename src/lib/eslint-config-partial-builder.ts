import sortBy from 'lodash/sortBy';
import uniq from 'lodash/uniq';
import { IntermediateConfigCollector } from './interfaces/intermediate-config-collector';
import { EslintConfigPartial } from './interfaces/eslint-config-partial';

export const createPartialFromCollector = (
  collector: IntermediateConfigCollector
): EslintConfigPartial => {
  const { extends: collectorExtendsEntries, plugins } = collector;

  const earlyExtendsEntries = collectorExtendsEntries
    .filter((entry) => entry.order === 'early')
    .filter((entry) => entry.if === undefined || plugins.includes(entry.if))
    .map((entry) => entry.name);

  const normalExtendsEntries = collectorExtendsEntries
    .filter((entry) => entry.order === 'normal')
    .filter((entry) => entry.if === undefined || plugins.includes(entry.if))
    .map((entry) => entry.name);

  const lateExtendsEntries = collectorExtendsEntries
    .filter((entry) => entry.order === 'late')
    .filter((entry) => entry.if === undefined || plugins.includes(entry.if))
    .map((entry) => entry.name);

  const extendsEntries = sortBy<string>(uniq<string>(earlyExtendsEntries))
    .concat(sortBy<string>(uniq<string>(normalExtendsEntries)))
    .concat(sortBy<string>(uniq<string>(lateExtendsEntries)));

  return {
    plugins,
    extends: extendsEntries,
  };
};
