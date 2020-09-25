import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Build, FileCopy } from '@material-ui/icons';
import { useLocation } from 'react-router';

import { list as supportedPlugins } from '../../lib/plugins';
import { addConfigToCollector } from '../../lib/intermediate-config-collector-builder';
import { IntermediateConfigCollector } from '../../lib/interfaces/intermediate-config-collector';
import { createPartialFromCollector } from '../../lib/eslint-config-partial-builder';
import {
  BuildTools,
  createNpmOrYarnCommand,
} from '../../lib/npm-yarn-command-builder';

const Results = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  // get the list from the URL
  const requestedPlugins = query.get('selection')?.split(',') as string[];
  // filter and intersect with the supported
  const finalPlugins = supportedPlugins.filter((s) =>
    // lower case match
    requestedPlugins.map((r) => r.toLowerCase()).includes(s.name.toLowerCase())
  );
  const collector = finalPlugins.reduce(
    (collector: IntermediateConfigCollector | null, current) =>
      addConfigToCollector(current, collector),
    null
  );

  // generate the config file
  const [eslintConfigPartial, setEslintConfigPartial] = useState('');
  useEffect(() => {
    if (collector) {
      const partialEslint = createPartialFromCollector(collector);
      setEslintConfigPartial(JSON.stringify(partialEslint, null, 2));
    }
  }, [collector]);

  // generate command
  const [commandType, setCommandType] = useState(BuildTools.YARN);
  const [installCommand, setInstallCommand] = useState('');
  useEffect(() => {
    if (collector) {
      const command = createNpmOrYarnCommand(collector, commandType);
      setInstallCommand(command);
    }
  }, [collector, commandType]);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={6} direction="column">
        <Grid item>
          <Typography variant="h5" align="center">
            All what you need to do now is to copy your files
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Install dependencies</Typography>
        </Grid>
        <Grid container item xs={12} justify="space-between">
          <Grid item xs={10}>
            <TextField
              id="command"
              fullWidth
              value={installCommand}
              InputProps={{
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => copyToClipboard(installCommand)}>
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
        <Grid item xs={12}>
          <Typography variant="h6">
            Copy your config file to <code>.eslintrc.js</code>
          </Typography>
        </Grid>
        <Grid item xs={12}>
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
                    onClick={() => copyToClipboard(eslintConfigPartial)}
                  >
                    <FileCopy />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Results;
