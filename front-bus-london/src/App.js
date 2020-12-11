import React from 'react';
import logo from './logo.svg';
import './App.css';
import Messages from './components/Messages';


const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Messages active={true} />
      </header>
    </div>
  );
};

export default App;
