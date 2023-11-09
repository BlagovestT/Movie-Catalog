import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Favorites from './routes/Favorites';
import Home from './routes/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
