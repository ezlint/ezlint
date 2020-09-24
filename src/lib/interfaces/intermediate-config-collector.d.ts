import { Order } from './order';

export interface IntermediateExtendsEntry {
    name: string,
    order: Order,
}

export interface IntermediateConfigCollector {
    plugins: string[],
    extends: IntermediateExtendsEntry[],
}
