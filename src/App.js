import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SearchPage from './components/search';
import DashboardPage from './components/dashboard';
import RepositoryPage from './components/repositories';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<SearchPage/>} />
          <Route path="/:user_id" element={<DashboardPage/>} />
          <Route path="/:user_id/:repo_id" element={<RepositoryPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
