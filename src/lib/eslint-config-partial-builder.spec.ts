import { createPartialFromCollector } from './eslint-config-partial-builder';
import { IntermediateConfigCollector } from './interfaces/intermediate-config-collector';

describe('createPartialFromCollector', () => {
  it('creates a partial with the all the plugins from the input', async () => {
    const collector: IntermediateConfigCollector = {
      plugins: ['plugin-A', 'plugin-B', 'plugin-C'],
      extends: [],
      dependencies: [],
    };

    const result = createPartialFromCollector(collector);

    expect(result).toHaveProperty('plugins', collector.plugins);
  });

  it('creates a partial with the all the extends entries from the input, ordered "early", "normal", "late"', async () => {
    const collector: IntermediateConfigCollector = {
      plugins: [],
      extends: [
        { name: 'config-A', order: 'normal' },
        { name: 'config-B', order: 'late' },
        { name: 'config-C', order: 'normal' },
        { name: 'config-D', order: 'early' },
        { name: 'config-E', order: 'early' },
        { name: 'config-F', order: 'normal' },
      ],
      dependencies: [],
    };

    const result = createPartialFromCollector(collector);

    expect(result).toHaveProperty('extends', [
      'config-D', // early
      'config-E',
      'config-A', //normal
      'config-C',
      'config-F',
      'config-B', // late
    ]);
  });
});
