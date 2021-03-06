import React, { Component } from 'react';
import { connect } from 'react-redux';
import './map.css';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Immutable from 'immutable';
import { setStyle } from '../../store/index';

import geojsonTrafic from '../../data/ci_trafi.json';

import SidebarLeft from '../Sidebar/SidebarLeft';




class Map extends Component {
  state = {
    hoveredStateId: null,
    properties: null,
  };
  componentDidMount() {
    const { accessToken, styleName, lon, lat, zoomScale, line } = this.props;
    const { setStyle } = this.props;
    this.properties = null;

    mapboxgl.accessToken = accessToken;

    this.map = new mapboxgl.Map({
      container: 'map', // html element id in render
      style: `mapbox://styles/${styleName}`,
      center: [lon, lat], // note lon comes before lat - geoJSON convention
      zoom: [zoomScale],
    });


    this.map.on('load', async () => {

      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });

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

      // TODO: Add .id to each feature to be able to use the SetFeatureState

      // this.map.on('mousemove', 'cta-lines', (e) => {
      //   if (e.features.length > 0) {
      //     if (this.state.hoveredStateId) {
      //       this.map.setFeatureState(
      //         { source: 'cta-lines', id: this.map.hoveredStateId },
      //         { hover: false }
      //       );
      //     }
      //     this.map.hoveredStateId = e.features[0].id;
      //     console.log(e.features[0]);
      //     this.map.setFeatureState(
      //       { source: 'cta-lines', id: this.map.hoveredStateId },
      //       { hover: true }
      //     );
      //   }
      // });

      this.map.on('mouseenter', 'cta-lines', (e) => {

        this.setState({ properties: e.features[0]['properties'] });
        var coordinates = e.features[0].geometry.coordinates.slice();
        popup.setLngLat(coordinates[0]).setHTML(e.features[0]['properties']['etat']).addTo(this.map);
      });

      this.map.on('mouseleave', 'cta-lines', () => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
      });

      setStyle(this.map.getStyle());
    });

  }

  componentDidUpdate(prevProps) {

    console.log('this state');
    console.log(this.state);

    const currentStyle = this.props.style;
    const previousStyle = prevProps.style;

    console.log(this.props);

    this.map.easeTo({
      padding: { left: 3000 },
      duration: 1000
    });




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
    return (
      <div id="map">
        <SidebarLeft map={this.map} properties={this.state.properties} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    style: state.style,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    setStyle: style => dispatch(setStyle(style)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);


