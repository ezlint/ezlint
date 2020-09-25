import { sortBy } from 'lodash';
import {LibraryConfig} from "./interfaces/library-config";
import {IntermediateConfigCollector, IntermediateExtendsEntry} from "./interfaces/intermediate-config-collector";
import {Order} from "./interfaces/order";

const DEFAULT_ORDER: Order = "normal";

const getEntriesForLibConfig = (libConfig: LibraryConfig): IntermediateExtendsEntry[] =>
    libConfig.extendsConfigs.map(config => ({
        name: config,
        order: libConfig.order||DEFAULT_ORDER,
    }));

export const createCollectorFromLibConfig = (libConfig: LibraryConfig): IntermediateConfigCollector => {
    const { plugins } = libConfig;

    const entries = getEntriesForLibConfig(libConfig);

    return {
        plugins,
        extends: entries,
    }
};

export const addConfigToCollector =
    (libConfig: LibraryConfig, collector: IntermediateConfigCollector|null = null): IntermediateConfigCollector => {
        if (collector === null) {
            return createCollectorFromLibConfig(libConfig);
        }

        const plugins = sortBy<string>(collector.plugins.concat(libConfig.plugins));

        const entries = getEntriesForLibConfig(libConfig);

        return {
            ...collector,
            plugins,
            extends: [ ...collector.extends, ...entries, ],
        };
    };
