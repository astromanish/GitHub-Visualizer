import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './styles/app.css'; //global styling 

//page specific styling 
import './styles/Followers.css';
import './styles/Repositories.css';
import './styles/Activities.css';
import './styles/Charts.css';
import './styles/ProfileTop.css';
import './styles/SearchPage.css';
import './styles/Footer.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

