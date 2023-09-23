import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Scoreboard from './Scoreboard';
import './App.css';
import { Routes, Route, HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <HashRouter>
        <Routes>
          <Route path='/' exact element={ <App/> }></Route>
          <Route path='/scoreboard' element={ <Scoreboard /> } />
        </Routes>
      </HashRouter>
  </React.StrictMode>
);