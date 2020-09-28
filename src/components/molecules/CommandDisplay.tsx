import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Switch,
} from '@material-ui/core';
import { FileCopy } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { IntermediateConfigCollector } from '../../lib/interfaces/intermediate-config-collector';
import {
  BuildTools,
  createNpmOrYarnCommand,
} from '../../lib/npm-yarn-command-builder';

export interface CommandDisplayProps {
  collector: IntermediateConfigCollector | null;
}

const CommandDisplay: React.FC<CommandDisplayProps> = ({ collector }) => {
  // generate command
  const [commandType, setCommandType] = useState(BuildTools.YARN);
  const [installCommand, setInstallCommand] = useState('');
  useEffect(() => {
    if (collector) {
      const command = createNpmOrYarnCommand(collector, commandType);
      setInstallCommand(command);
    }
  }, [collector, commandType]);

  return (
    <Grid container justify="space-between">
      <Grid item xs={10}>
        <TextField
          id="command"
          fullWidth
          value={installCommand}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    void navigator.clipboard.writeText(installCommand)
                  }
                >
                  <FileCopy />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <Grid container alignItems="center" spacing={1}>
          <Grid item>yarn</Grid>
          <Grid item>
            <Switch
              onChange={(e) =>
                e.target.checked
                  ? setCommandType(BuildTools.NPM)
                  : setCommandType(BuildTools.YARN)
              }
            />
          </Grid>
          <Grid item>npm</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommandDisplay;
