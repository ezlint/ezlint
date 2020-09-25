import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { createPartialFromCollector } from '../../lib/eslint-config-partial-builder';
import { IntermediateConfigCollector } from '../../lib/interfaces/intermediate-config-collector';

export interface ConfigDisplayProps {
  collector: IntermediateConfigCollector | null;
}

const ConfigDisplay: React.FC<ConfigDisplayProps> = ({ collector }) => {
  // generate the config file
  const [eslintConfigPartial, setEslintConfigPartial] = useState('');
  useEffect(() => {
    if (collector) {
      const partialEslint = createPartialFromCollector(collector);
      setEslintConfigPartial(JSON.stringify(partialEslint, null, 2));
    }
  }, [collector]);

  return (
    <TextField
      id="config"
      multiline
      fullWidth
      variant="filled"
      value={eslintConfigPartial}
      InputProps={{
        readOnly: true,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() =>
                void navigator.clipboard.writeText(eslintConfigPartial)
              }
            >
              <FileCopy />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ConfigDisplay;
