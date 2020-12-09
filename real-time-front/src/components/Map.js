import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import './Map.css';


mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props,
            tmpMap: {},
        };
    }

    componentDidUpdate(prevProps) {
        // const { data } = this.state.props;

        console.log(prevProps);
        console.log(this.state);
        if (!this.state) {
            return;
        }
        if (this.state && this.state.tmpMap && prevProps && prevProps.point) {

            const data = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Point',
                            'coordinates': [prevProps.point.longitude, prevProps.point.latitude],
                        }
                    },
                ]
            }
            if (!this.state.tmpMap.getSource("points")) {
                return;
            };
            this.state.tmpMap.getSource("points").setData(data);

        }


    }

    componentDidMount() {
        let map = new mapboxgl.Map({
            zoom: 13,
            center: [-0.11080741882324219, 51.51413762092547],
            container: this.mapContainer,
            style: 'mapbox://styles/mapbox/dark-v10',
            // style: 'mapbox://styles/mzabalza/ckfe4ioha00ha19pf3ualslwz'
        });



        map.on('load', function () {

            map.addSource('points', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [2.56, 47.97],
                            }
                        },
                    ]
                }
            });


            map.addLayer({
                'id': 'points',
                type: "circle",
                'source': 'points',
                paint: {
                    'circle-color': '#e5211d',
                }

            });


        });

        this.setState({ tmpMap: map });
    }

    render() {
        const style = {
            // position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',

        };
        return (
            <div>
                <div style={style} ref={el => this.mapContainer = el} />
            </div>
        );
    }
}

export default Map;
