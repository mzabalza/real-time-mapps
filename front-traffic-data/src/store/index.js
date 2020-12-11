import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import axios from 'axios';

// ACTION TYPES
const SET_STYLE = 'SET_STYLE';
const TOGGLE_STATIONS = 'TOGGLE_STATIONS';
const CHANGE_MARKER_SIZE = 'CHANGE_MARKER_SIZE';

// ACTION CREATORS
export const setStyle = style => ({
  type: SET_STYLE,
  style,
});
export const toggleStations = visibility => ({
  type: TOGGLE_STATIONS,
  visibility,
});
export const changeMarkerSize = size => ({
  type: CHANGE_MARKER_SIZE,
  size
})

// INITIAL STATE
const initialState = {
  style: {},
  chargingStations: [],
};

// HANDLERS
const handlers = {
  [SET_STYLE]: (state, action) => {
    return { ...state, style: action.style };
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
  }
};

// REDUCER
const reducer = (state = initialState, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  } else {
    return handlers[action.type](state, action);
  }
};

const middleware = applyMiddleware(loggingMiddleware, thunkMiddleware);
const store = createStore(reducer, middleware);
export default store;
