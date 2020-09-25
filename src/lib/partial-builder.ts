import { LibraryConfig } from './interfaces/library-config';
import { EslintConfigPartial } from './interfaces/eslint-config-partial';

export const createPartialFromLibConfig = (
  libConfig: LibraryConfig
): EslintConfigPartial => {
  const { plugins, extendsConfigs } = libConfig;
  return {
    plugins,
    extends: extendsConfigs,
  };
};

export const addConfigToPartial = (
  libConfig: LibraryConfig,
  partial: EslintConfigPartial | null = null
): EslintConfigPartial => {
  if (partial === null) {
    return createPartialFromLibConfig(libConfig);
  }

  const { plugins: libPlugins, extendsConfigs: libExtends } = libConfig;
  const { plugins: partialPlugins, extends: partialExtends } = partial;

  const plugins = [...libPlugins, ...partialPlugins];
  const extendsConfig = [...libExtends, ...partialExtends];

  return { ...partial, plugins, extends: extendsConfig };
};
