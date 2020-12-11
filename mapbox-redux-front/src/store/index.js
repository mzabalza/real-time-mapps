import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';

// ACTION TYPES
const SET_TRAIN_DATA = 'SET_TRAIN_DATA';
const SET_STYLE = 'SET_STYLE';
const SET_MAP = 'SET_MAP';
const TOGGLE_TRAINS = 'TOGGLE_TRAINS';

const SET_CHARGING_STATIONS = 'SET_CHARGING_STATIONS';
const CHANGE_WATER_COLOR = 'CHANGE_WATER_COLOR';
const TOGGLE_STATIONS = 'TOGGLE_STATIONS';
const CHANGE_MARKER_SIZE = 'CHANGE_MARKER_SIZE';

// ACTION CREATORS
export const setTrainData = data => ({
  type: SET_TRAIN_DATA,
  data
})
export const setStyle = style => ({
  type: SET_STYLE,
  style
})
export const setMap = map => ({
  type: SET_MAP,
  map
})
export const toggleTrains = option => ({
  type: TOGGLE_TRAINS,
  option
})
/////////////////////////////////////////////////
// ACTION CREATORS 2

export const setChargingStations = chargingStations => ({
  type: SET_CHARGING_STATIONS,
  chargingStations,
});
export const changeWaterColor = color => ({
  type: CHANGE_WATER_COLOR,
  color,
});
export const toggleStations = visibility => ({
  type: TOGGLE_STATIONS,
  visibility,
});
export const changeMarkerSize = size => ({
  type: CHANGE_MARKER_SIZE,
  size
})
/////////////////////////////////////////////////

// THUNK CREATORS

// INITIAL STATE
const initialState = {
  trains: {
    redLine: [],
    blueLine: [],
    greenLine: [],
    orangeLine: [],
    brownLine: [],
    pinkLine: []
  },
  trainInfo: {
    colors: ['#c60c30', '#00a1de', '#009b3a', '#f9461c', '#62361b', '#e27ea6'],
    lines: ['redLine', 'blueLine', 'greenLine', 'orangeLine', 'brownLine', 'pinkLine']
  },
  style: {},
  map: null
}

// HANDLERS
const handlers = {
  /////////////////////////////////////////////////
  [SET_STYLE]: (action, state) => {
    return { ...state, style: action.style }
  },

  [SET_CHARGING_STATIONS]: (state, action) => {
    return { ...state, chargingStations: action.chargingStations };
  },
  [CHANGE_WATER_COLOR]: (state, action) => {
    const newStyle = { ...state.style };
    const layer = newStyle.layers.find(layer => layer.id === 'cta-lines');
    layer.paint[`fill-color`] = action.color;
    return { ...state, style: newStyle };
  },
  [TOGGLE_STATIONS]: (state, action) => {
    const newStyle = { ...state.style };
    const layer = newStyle.layers.find(layer => layer.id === 'cta-lines');
    layer.layout.visibility = action.visibility;
    return { ...state, style: newStyle };
  },
  [CHANGE_MARKER_SIZE]: (state, action) => {
    const newStyle = { ...state.style };
    const layer = newStyle.layers.find(layer => layer.id === 'cta-lines');
    layer.paint['line-width'] = action.size
    return { ...state, style: newStyle }
  },
  /////////////////////////////////////////////////

  [SET_TRAIN_DATA]: (action, state) => {
    return {
      ...state,
      trains: {
        redLine: action.data.redLine,
        blueLine: action.data.blueLine,
        greenLine: action.data.greenLine,
        orangeLine: action.data.orangeLine,
        brownLine: action.data.brownLine,
        pinkLine: action.data.pinkLine
      }
    }
  },

  [SET_MAP]: (action, state) => {
    return { ...state, map: action.map }
  },
  [TOGGLE_TRAINS]: (action, state) => {
    const newStyle = { ...state.style }
    const trainLayers = state.trainInfo.lines.map(line => {
      return newStyle.layers.find(
        layer => layer.id === `cta-${line}-trains`
      )
    })
    if (action.option === 'all') {
      trainLayers.forEach(trainLayer => {
        trainLayer.layout.visibility = 'visible'
      })
    } else {
      trainLayers.forEach((trainLayer, idx) => {
        if (state.trainInfo.lines[idx] !== action.option) trainLayer.layout.visibility = 'none'
        else trainLayer.layout.visibility = 'visible'
      })
    }
    return { ...state, style: newStyle }
  }
}

// REDUCER
const reducer = (state = initialState, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state
  } else {
    return handlers[action.type](action, state)
  }
}

// CREATE STORE
const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware)
const store = createStore(reducer, middleware)
export default store
