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
          <Route path="/:profile_id" element={<DashboardPage/>} />
          <Route path="/:profile_id/:repo_name" element={<RepositoryPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
