import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Body.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Immutable from 'immutable';
import { setStyle, fetchAllStations } from '../store/index';

import geojsonCtaLines from '../data/CTA_Rail_Lines.json';
import geojsonTrafic from '../data/ci_trafi.json';


class Map extends Component {
  componentDidMount() {
    const { accessToken, styleName, lon, lat, zoomScale, line } = this.props;
    const { setStyle, setInitialStations } = this.props;

    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // html element id in render
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat], // note lon comes before lat - geoJSON convention
      zoom: [zoomScale],
    });

    this.map.on('load', async () => {
      await setInitialStations().then(() => {
        const { chargingStations } = this.props;

        this.map.addSource('cta-lines', {
          type: 'geojson',
          data: geojsonTrafic
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
            'line-color': [
              "match",
              ["get", "etat"],
              ["DENSE"],
              "hsl(0, 85%, 50%)",
              ["EMBOUTEILLE"],
              "hsl(40, 88%, 55%)",
              ["INCONNU"],
              "hsl(0, 3%, 37%)",
              "hsl(117, 93%, 66%)"
            ],
            'line-width': 3
          }
        })

        this.map.addSource('ev-charging-stations', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: chargingStations.map(station => {
              return {
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [station.longitude, station.latitude],
                },
              };
            }),
          },
        });

        this.map.addLayer({
          id: 'allStations',
          type: 'circle',
          source: 'ev-charging-stations',
          layout: {
            visibility: 'none',
          },
          paint: {
            'circle-radius': 3,
            'circle-color': '#B42222',
          },
        });
        setStyle(this.map.getStyle());
      });
    });
  }

  componentDidUpdate(prevProps) {



    const currentStyle = this.props.style;
    const previousStyle = prevProps.style;

    console.log(this.props);


    if (this.props.style === null) return;

    if (!Immutable.is(previousStyle, currentStyle)) {
      this.map.setStyle(currentStyle);
    }

    if (this.props.line === null) return;
    if (!this.map.getSource("cta-lines")) return;

    console.log(this.props.line);

    this.map.getSource("cta-lines").setData(this.props.line);

  };

  render() {
    return <div id="map" />;
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
    chargingStations: state.chargingStations,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setStyle: style => dispatch(setStyle(style)),
    setInitialStations: () => dispatch(fetchAllStations()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);


