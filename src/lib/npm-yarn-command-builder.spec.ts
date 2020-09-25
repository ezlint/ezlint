import {BuildTools, createNpmOrYarnCommand} from './npm-yarn-command-builder';
import {IntermediateConfigCollector} from "./interfaces/intermediate-config-collector";

describe('createNpmOrYarnCommand', () => {

    it('returns a yarn command for the given dependencies', async () => {
       const collector: IntermediateConfigCollector = {
           plugins: [],
           extends: [],
           dependencies: [
               'dependency-A',
               'dependency-B',
               'dependency-C',
           ],
       };

       const result = createNpmOrYarnCommand(collector, BuildTools.YARN);

       expect(result).toEqual(`yarn add --dev ${collector.dependencies.join(' ')}`);
    });

    it('returns an NPM command for the given dependencies', async () => {
        const collector: IntermediateConfigCollector = {
            plugins: [],
            extends: [],
            dependencies: [
                'dependency-A',
                'dependency-B',
                'dependency-C',
            ],
        };

        const result = createNpmOrYarnCommand(collector, BuildTools.NPM);

        expect(result).toEqual(`npm install -D ${collector.dependencies.join(' ')}`);
    });

});