import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Search from './components/search/index';
import Profile from './components/dashboard/index';
import MoreRepoDetails from './components/repositories/index';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Search} />
          <Route exact path="/:profile_id/:repo_name" component={MoreRepoDetails} />
          <Route exact path="/:profile_id" component={Profile} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
