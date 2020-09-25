import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Layout } from './components/templates/Layout';
import SearchThingy from './components/organisms/SearchThingy';

function App() {
  const theme = createMuiTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* import other stuff here */}
        <Layout>
          <Switch>
            <Route exact path="/">
              <SearchThingy />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
