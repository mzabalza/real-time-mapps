import React, { useState, useEffect } from 'react';
import './App.css';
import Map from './Map';
import Sidebar from './Sidebar';
import io from 'socket.io-client';
import mapboxgl from 'mapbox-gl';


let socket;


const MapWrapper = () => {


  const accessToken =
    'pk.eyJ1IjoianVsaWFubmVtYXJpayIsImEiOiJjam5sb280eHEwOWU3M3dueHR5ZThxNmw4In0.tdBsmI4y5XD-1FsLeVS_hQ';
  const styleName = 'mapbox/light-v9';
  const lon = -0.5726092462646674;
  const lat = 44.84385408688304;
  const zoomScale = 11;

  const [line, setLine] = useState(null);

  const ENDPOINT = 'http://localhost:5010';

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log(socket);

    // socket.emit('join', { name: 'mike', room: 'geo' });


    return () => {
      socket.emit('disconnect');
      // socket.disconnect();
      console.log('out!!!');
    }
  }, [ENDPOINT]);

  useEffect(() => {

    socket.on('point', (point) => {
      // console.log('yihiiiiiii');
      // console.log(point);
      setLine(point);
    });


  }, []);


  return (
    <div>
      <Map
        accessToken={accessToken}
        styleName={styleName}
        lon={lon}
        lat={lat}
        zoomScale={zoomScale}

        line={line}
      />
      <Sidebar />
    </div>
  )
};

export default MapWrapper;