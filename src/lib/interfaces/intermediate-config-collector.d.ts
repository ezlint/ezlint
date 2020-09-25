import { Order } from './order';

export interface IntermediateExtendsEntry {
  name: string;
  order: Order;
  if?: string;
}

export interface IntermediateConfigCollector {
  plugins: string[];
  extends: IntermediateExtendsEntry[];
  dependencies: string[];
}
