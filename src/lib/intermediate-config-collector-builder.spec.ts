import uniq from 'lodash/uniq';
import {
  createCollectorFromLibConfig,
  addConfigToCollector,
} from './intermediate-config-collector-builder';
import { LibraryConfig } from './interfaces/library-config';
import { IntermediateConfigCollector } from './interfaces/intermediate-config-collector';

describe('IntermediateConfigCollector builder', () => {
  describe('createCollectorFromLibConfig', () => {
    it('creates a collector with a .plugins entry for each .plugins entry in the input', async () => {
      const libConfig: LibraryConfig = {
        name: '',
        plugins: ['plugin-A', 'plugin-B'],
        extendsConfigs: [],
        optionalExtends: [],
        dependencies: [],
      };

      const result = createCollectorFromLibConfig(libConfig);

      expect(result).toHaveProperty('plugins', ['plugin-A', 'plugin-B']);
    });

    it('creates a collector with a .dependencies entry for each .dependencies entry in the input', async () => {
      const libConfig: LibraryConfig = {
        name: '',
        plugins: [],
        extendsConfigs: [],
        optionalExtends: [],
        dependencies: ['dep-A', 'dep-B'],
      };

      const result = createCollectorFromLibConfig(libConfig);

      expect(result).toHaveProperty('dependencies', ['dep-A', 'dep-B']);
    });

    describe('.extends', () => {
      it("has an entry for each entry in the input's .extendsConfigs arr", () => {
        const libConfig: LibraryConfig = {
          name: '',
          plugins: [],
          extendsConfigs: ['config-A', 'config-B'],
          optionalExtends: [],
          dependencies: [],
        };

        const result = createCollectorFromLibConfig(libConfig);

        expect(result).toHaveProperty('extends');

        const namesOfExtendsEntries = result.extends.map((entry) => entry.name);
        expect(namesOfExtendsEntries).toHaveLength(
          libConfig.extendsConfigs.length
        );
      });

      it('entries have order:normal if no order is specified in the input', async () => {
        const libConfig: LibraryConfig = {
          name: '',
          plugins: [],
          extendsConfigs: ['config-A', 'config-B'],
          optionalExtends: [],
          dependencies: [],
          // no order specified
        };

        const result = createCollectorFromLibConfig(libConfig);

        const orderValues = result.extends.map((entry) => entry.order);

        for (const order of orderValues) {
          expect(order).toEqual('normal');
        }
      });

      it("entries have order:normal if input.order == 'normal'", async () => {
        const libConfig: LibraryConfig = {
          name: '',
          plugins: [],
          extendsConfigs: ['config-A', 'config-B'],
          optionalExtends: [],
          dependencies: [],
          order: 'normal', // order set to normal
        };

        const result = createCollectorFromLibConfig(libConfig);

        const orderValues = result.extends.map((entry) => entry.order);

        for (const order of orderValues) {
          expect(order).toEqual('normal');
        }
      });

      it("entries have order:late if input.order == 'late'", async () => {
        const libConfig: LibraryConfig = {
          name: '',
          plugins: [],
          extendsConfigs: ['config-A', 'config-B'],
          optionalExtends: [],
          dependencies: [],
          order: 'late', // order set to late
        };

        const result = createCollectorFromLibConfig(libConfig);

        const orderValues = result.extends.map((entry) => entry.order);

        for (const order of orderValues) {
          expect(order).toEqual('late');
        }
      });

      it("entries have order:early if input.order == 'early'", async () => {
        const libConfig: LibraryConfig = {
          name: '',
          plugins: [],
          extendsConfigs: ['config-A', 'config-B'],
          optionalExtends: [],
          dependencies: [],
          order: 'early', // order set to early
        };

        const result = createCollectorFromLibConfig(libConfig);

        const orderValues = result.extends.map((entry) => entry.order);

        for (const order of orderValues) {
          expect(order).toEqual('early');
        }
      });
    });
  });

  describe('addConfigToCollector', () => {
    it('adds the .plugins from the LibraryConfig into the existing .plugins set (uniq)', async () => {
      const collector: IntermediateConfigCollector = {
        extends: [],
        plugins: ['plugin-A', 'plugin-B'],
        dependencies: [],
      };

      const libConfig: LibraryConfig = {
        name: '',
        plugins: ['plugin-C', 'plugin-D'],
        extendsConfigs: [],
        optionalExtends: [],
        dependencies: [],
      };

      const result = addConfigToCollector(libConfig, collector);

      expect(result).toHaveProperty(
        'plugins',
        uniq(collector.plugins.concat(libConfig.plugins))
      );
    });

    it('adds the .dependencies from the LibraryConfig into the existing .dependencies set (uniq)', async () => {
      const collector: IntermediateConfigCollector = {
        extends: [],
        plugins: [],
        dependencies: ['dep-A', 'dep-B'],
      };

      const libConfig: LibraryConfig = {
        name: '',
        plugins: [],
        extendsConfigs: [],
        optionalExtends: [],
        dependencies: ['dep-C', 'dep-D'],
      };

      const result = addConfigToCollector(libConfig, collector);

      expect(result).toHaveProperty(
        'dependencies',
        uniq(collector.dependencies.concat(libConfig.dependencies))
      );
    });

    it('adds an entry in collector.extends for each entry in libConfig.extends', async () => {
      const collector: IntermediateConfigCollector = {
        extends: [
          { name: 'config-A', order: 'normal' },
          { name: 'config-B', order: 'early' },
        ],
        plugins: [],
        dependencies: [],
      };

      const libConfig: LibraryConfig = {
        name: '',
        plugins: [],
        extendsConfigs: ['config-C', 'config-D'],
        optionalExtends: [],
        dependencies: [],
      };

      const result = addConfigToCollector(libConfig, collector);

      const inputExtendsEntriesNames = collector.extends.map(
        (entry) => entry.name
      );
      const resultExtendsEntriesNames = result.extends.map(
        (entry) => entry.name
      );

      expect(resultExtendsEntriesNames).toEqual(
        uniq(inputExtendsEntriesNames.concat(libConfig.extendsConfigs))
      );
    });
  });
});
