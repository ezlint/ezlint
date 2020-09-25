import { useState } from 'react';
import { IntermediateConfigCollector } from '../../lib/interfaces/intermediate-config-collector';

export const useCollector = () => {
  const [
    collector,
    setCollector,
  ] = useState<IntermediateConfigCollector | null>(null);

  return { collector, setCollector };
};

export default useCollector;
