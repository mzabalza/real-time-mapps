import React, { Component } from 'react';
import './App.css';
import MapWrapper from './components/Map/MapWrapper';
import Sidebar from './components/Sidebar/Sidebar';
import { Provider } from 'react-redux'


import store from './store/index'



class App extends Component {
  render() {


    return (
      <Provider store={store}>
        <div className="App">
          <MapWrapper />
        </div>
      </Provider>

    );
  }
}

export default App;
