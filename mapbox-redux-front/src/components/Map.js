import React, { Component } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable'
import mapboxgl from 'mapbox-gl';

// ACTIONS
import { setStyle, setMap } from '../store/index'

// DATA
import geojsonCtaLines from '../data/CTA_Rail_Lines.json'


class Map extends Component {
    componentDidMount() {
        const { accessToken, styleName, lon, lat, zoomScale } = this.props;

        mapboxgl.accessToken = accessToken;

        this.map = new mapboxgl.Map({
            container: 'map',
            style: `mapbox://styles/${styleName}`,
            center: [lon, lat],
            zoom: [zoomScale]
        });

        this.map.on('load', async () => {
            // ADD MAP SOURCES
            this.map.addSource('cta-lines', {
                type: 'geojson',
                data: geojsonCtaLines
            })

            // ADD MAP LAYERS
            this.map.addLayer({
                id: 'cta-lines',
                type: 'line',
                source: 'cta-lines',
                layout: {
                    'line-cap': 'round',
                    // 'line-join': 'round'
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 4
                }
            })
            this.props.setMap(this.map);
            this.props.setStyle(this.map.getStyle());

        });

    };

    componentDidUpdate(prevProps) {
        const currentStyle = this.props.style;
        const previousStyle = prevProps.style;

        if (this.props.style === null) return
        if (!Immutable.is(previousStyle, currentStyle)) {
            this.map.setStyle(currentStyle)
        }
    };



    render() {
        return <div id="map" style={{ width: '80vw', height: '100vh' }} />
    }
}

const mapStateToProps = state => ({
    trains: state.trains,
    trainColors: state.trainInfo.colors,
    style: state.style,
    map: state.map
});

const mapDispatchToProps = dispatch => {
    return {
        setStyle: style => dispatch(setStyle(style)),
        setMap: map => dispatch(setMap(map))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);