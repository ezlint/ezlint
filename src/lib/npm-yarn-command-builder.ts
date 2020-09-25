import { IntermediateConfigCollector } from './interfaces/intermediate-config-collector';

export enum BuildTools {
  NPM,
  YARN,
}

export const createNpmOrYarnCommand = (
  collector: IntermediateConfigCollector,
  tool: BuildTools
): string => {
  const { dependencies } = collector;

  const command =
    tool === BuildTools.YARN ? 'yarn add --dev' : 'npm install -D';

  return [command, ...dependencies].join(' ');
};
