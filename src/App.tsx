import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Layout } from './components/templates/Layout';
import Home from './components/pages/Home';
import Results from './components/pages/Results';

function App() {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1d1d1b',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* import other stuff here */}
        <Layout>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/results">
              <Results />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
