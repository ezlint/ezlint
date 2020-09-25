import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { EzLintIcon } from '../atoms/ezlint-icon';
import SearchThingy from '../organisms/SearchThingy';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(8, 0),
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      spacing={6}
      className={classes.root}
      direction="column"
    >
      <Grid item>
        <EzLintIcon
          style={{ color: '#000', width: '64px', height: '64px' }}
          viewBox="0 0 35 33"
        />
      </Grid>
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Create ESLint configuration for your project
        </Typography>
      </Grid>
      <SearchThingy />
    </Grid>
  );
};

export default Home;
