import './sidebar.css';
import React from 'react';
import { connect } from 'react-redux';
import { toggleStations, changeMarkerSize } from '../../store/index';

const Sidebar = props => {
  const { toggleStations, changeMarkerSize } = props;

  const handleStations = event => {
    const visibility = event.target.value === 'on' ? 'visible' : 'none';
    toggleStations(visibility);
  };

  const handleSizeChange = event => {
    console.log('SIZE CHANGE', event.target.value)
    const size = event.target.value;
    changeMarkerSize(Number(size));
  }

  return (
    <div id="sidebar">
      <h1>STYLING</h1>
      <form>
        <div
          className="styleOption evStations"
          onChange={event => handleStations(event)}
        >
          <h3> EV STATIONS </h3>
          <label className="sidebarField">
            <input type="radio" value="on" name="chargingStation" />
            On
          </label>
          <label className="sidebarField">
            <input type="radio" value="off" name="chargingStation" />
            Off
          </label>
        </div>

        <div
          className="styleOption icon"
          onChange={event => handleSizeChange(event)}
        >
          <h3>LINE SIZE</h3>
          <input
            type="number"
            step="0.5"
            min="3"
            max="10"
            className="zoomInput"
            placeholder="3"
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    toggleStations: visibility => {
      dispatch(toggleStations(visibility));
    },
    changeMarkerSize: size => {
      dispatch(changeMarkerSize(size));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Sidebar);
