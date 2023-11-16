import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import SearchPage from './components/search';
import DashboardPage from './components/dashboard';
import RepositoryPage from './components/repositories';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/:profile_id" component={DashboardPage} />
          <Route exact path="/:profile_id/:repo_name" component={RepositoryPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
