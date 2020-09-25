import { Order } from './order';

interface OptionalExport {
  if: string;
  include: string;
}

export interface LibraryConfig {
  name: string;
  order?: Order;
  plugins: string[];
  extendsConfigs: string[];
  optionalExtends?: OptionalExport[];
  dependencies: string[];
}
