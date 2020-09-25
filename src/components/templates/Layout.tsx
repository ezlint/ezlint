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
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    container: {
      width: '100%',
      display: 'block',
      boxSizing: 'border-box',
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: theme.spacing(2),
      minHeight: `calc(100% - ${theme.spacing(8)}px)`,
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
      },
      flexGrow: 1,
      height: '100vh',
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
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="icon"
          >
            <EzLintIcon onClick={navigateHome} viewBox="0 0 35 33"/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            EZLINT
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.container}>{children}</div>
    </div>
  );
};
