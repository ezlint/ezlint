import React, { useCallback } from 'react';
import {
  AppBar,
  createStyles,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { EzLintIcon } from '../atoms/ezlint-icon';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';
import { GithubButton } from '../atoms/github-icon';

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
  const navigateContribute = () => {
    window.open('https://github.com/ezlint/ezlint');
  };

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
          <Tooltip title="Contribute on GitHub">
            <IconButton
              onClick={navigateContribute}
              edge="end"
              className={classes.menuButton}
              color="inherit"
              aria-label="icon"
            >
              <GithubButton viewBox="0 0 256 250" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <div className={classes.container}>{children}</div>
    </>
  );
};
