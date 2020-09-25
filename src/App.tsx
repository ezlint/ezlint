import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import Home from './components/pages/Home';

function App() {
  const theme = {};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* import other stuff here */}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
