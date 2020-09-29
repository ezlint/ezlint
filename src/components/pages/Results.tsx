import { Container, Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useLocation } from 'react-router';

import { list as supportedPlugins } from '../../lib/plugins';
import { addConfigToCollector } from '../../lib/intermediate-config-collector-builder';
import { IntermediateConfigCollector } from '../../lib/interfaces/intermediate-config-collector';
import CommandDisplay from '../molecules/CommandDisplay';
import ConfigDisplay from '../molecules/ConfigDisplay';

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
        <Grid item xs={12}>
          <CommandDisplay collector={collector} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Copy your config file to <code>.eslintrc.js</code>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ConfigDisplay collector={collector} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Results;
