import React, { useCallback } from 'react';
import {
  AppBar,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { EzLintIcon } from '../atoms/ezlint-icon';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      width: '100%',
      padding: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
      },
      overflow: 'auto',
    },
  })
);

export const Layout: React.FC<any> = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const navigateHome = useCallback(() => {
    history.push('/');
  }, [history]);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={navigateHome}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="icon"
          >
            <EzLintIcon viewBox="0 0 35 33" />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            EZLINT
          </Typography>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>{children}</div>
    </>
  );
};
