import React, { useState } from 'react';
import Genre from './components/Genre/Genre';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1>The Film Arcade</h1>
      <div>
        <Genre name="Science Fiction" isSelected={ true } />
        <Genre name="Fantasy" isSelected={ false } />
      </div>
    </div>
  );
}

export default App;
