import React from 'react';
import logo from './logo.svg';
import './App.css';
import Generator from './components/generator/Generator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Generator />
      </header>
    </div>
  );
}

export default App;
