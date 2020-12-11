import logo from './logo.svg';
import Map from './components/Map';
import MapView from './components/MapView';

const App = () => {

  const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
  const styleName = 'mapbox/light-v9';
  const lon = -87.65;
  const lat = 41.895;
  const zoomScale = 10;

  return (
    <div>
      <MapView />
    </div>
  );
}

export default App;
