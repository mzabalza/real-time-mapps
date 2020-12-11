import React, { Component } from 'react';
import './App.css';
import MapWrapper from './MapWrapper';
import Sidebar from './Sidebar';
import { Provider } from 'react-redux'


import store from '../store/index'



class App extends Component {
  render() {


    return (
      <Provider store={store}>
        <div className="App">
          <MapWrapper />
          <Sidebar />
        </div>
      </Provider>

    );
  }
}

export default App;
