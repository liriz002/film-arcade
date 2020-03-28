import React from 'react';
import Genre from './components/Genre/Genre';
import { useSpring, animated } from 'react-spring';

import * as Constants from './constants/index';
import './App.css';

function App() {

   const props = useSpring({ opacity: 1, from: { opacity: 0 }} );

  const AnimatedGenre = animated( Genre );

  return (
    <div className="App">
      <h1>The Film Arcade</h1>
      <AnimatedGenre style={ props } name="Science Fiction" />
    </div>
  );
}

export default App;
