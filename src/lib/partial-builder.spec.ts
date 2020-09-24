import { uniq } from 'lodash';
import { createPartialFromLibConfig, addConfigToPartial } from './partial-builder';
import {EslintConfigPartial} from "./interfaces/eslint-config-partial";
import {LibraryConfig} from "./interfaces/library-config";

describe('partial builder', () => {

    describe('createPartialFromLibConfig', () => {

        it('creates a partial with a "plugins" field copied from the provided LibraryConfig', async () => {

            const libConfig: LibraryConfig = {
                name: '',
                plugins: [
                    'plugin-A',
                    'plugin-B'
                ],
                extendsConfigs: [],
                optionalExtends: []
            }

            const result = createPartialFromLibConfig(libConfig);

            expect(result).toHaveProperty('plugins', [
                'plugin-A',
                'plugin-B',
            ]);

        });

        it('creates a partial with an "extends" field copied from the provided LibraryConfig', async () => {

            const libConfig: LibraryConfig = {
                name: '',
                plugins: [],
                extendsConfigs: [
                    'config-A',
                    'config-B',
                ],
                optionalExtends: []
            }

            const result = createPartialFromLibConfig(libConfig);

            expect(result).toHaveProperty('extends', [
                'config-A',
                'config-B',
            ]);

        });

    });

    describe('addConfigToPartial', () => {

        it('adds the "plugins" from the LibraryConfig into the existing "plugins" list', async () => {

            const partial: EslintConfigPartial = {
                plugins: [
                    'plugin-A',
                    'plugin-B',
                ],
                extends: [
                    'config-A',
                    'config-B',
                ]
            };

            const libConfig: LibraryConfig = {
                name: '',
                plugins: [
                    'plugin-C',
                    'plugin-D',
                ],
                extendsConfigs: [],
                optionalExtends: [],
            }

            const result = addConfigToPartial(libConfig, partial);

            expect(result).toHaveProperty('plugins', uniq(
                libConfig.plugins.concat(partial.plugins)
            ));

        });

        it('adds the "extends" from the LibraryConfig\'s "extendsConfigs" into the existing "extends" list', async () => {

            const partial: EslintConfigPartial = {
                plugins: [
                    'config-A',
                    'config-B',
                ],
                extends: [],
            };

            const libConfig: LibraryConfig = {
                name: '',
                plugins: [],
                extendsConfigs: [
                    'config-C',
                    'config-D',
                ],
                optionalExtends: [],
            }

            const result = addConfigToPartial(libConfig, partial);

            expect(result).toHaveProperty('plugins', uniq(
                libConfig.plugins.concat(partial.plugins)
            ));

        });

    });

});
