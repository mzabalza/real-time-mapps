import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import mapboxgl from 'mapbox-gl';
import Map from './Map';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


let socket;

const Messages = ({ active }) => {

    const [point, setPoint] = useState(null);
    const ENDPOINT = 'http://localhost:5010';


    useEffect(() => {
        console.log('New user');
        socket = io(ENDPOINT);
        console.log(socket);

        socket.emit('join', { name: 'mike', room: 'geo' });


        // SIMILAR TO COMPONENT DID UNMOUNT?
        return () => {
            // socket.emit('disconnect');
            socket.disconnect();

            console.log('out!!!');
        }
    }, [ENDPOINT, active]);

    useEffect(() => {

        socket.on('point', (point) => {
            // console.log('yihiiiiiii');
            // console.log(point);
            setPoint(point);
        });


    }, []);



    return (
        <div>
            {point && (
                <div>
                    <div>{point.key}</div>
                    <div>{point.timestamp}</div>
                    <div>{point.latitude}</div>
                    <div>{point.longitude}</div>
                </div>
            )}
            <div>
                <Map point={point} name='mike' />
            </div>
        </div>
    )
};

export default Messages;