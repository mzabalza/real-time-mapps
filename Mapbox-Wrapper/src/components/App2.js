import React, { Component, useState, useEffect } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import { Provider } from 'react-redux';
import Map from './Map';
import io from 'socket.io-client';
import store from '../store/index'

let socket;



const App2 = () => {

  const [point, setPoint] = useState(null);

  const accessToken =
    'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ';
  const styleName = 'mapbox/light-v9';
  const lon = -0.5726092462646674;
  const lat = 44.84385408688304;
  const zoomScale = 11;



  const ENDPOINT = 'http://localhost:5010';




  return (
    <Provider store={store}>
      <div className="App">
        <Map
          accessToken={accessToken}
          styleName={styleName}
          lon={lon}
          lat={lat}
          zoomScale={zoomScale}

        />
        <Sidebar />
      </div>
    </Provider>

  );
}

export default App2;
