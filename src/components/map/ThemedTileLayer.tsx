import { TileLayer } from 'react-leaflet';
import { useTheme } from 'next-themes';

// Stadia Maps "OSM Bright" (light) and "Alidade Smooth Dark", following the site theme.
// Works without a key on localhost. For the live site either register the domain in the Stadia
// dashboard (no key needed) or set VITE_STADIA_API_KEY.
const STADIA_KEY = import.meta.env.VITE_STADIA_API_KEY as string | undefined;

const ThemedTileLayer = () => {
  const { resolvedTheme } = useTheme();
  const style = resolvedTheme === 'dark' ? 'alidade_smooth_dark' : 'osm_bright';
  const query = STADIA_KEY ? `?api_key=${STADIA_KEY}` : '';
  return (
    <TileLayer
      key={style}
      url={`https://tiles.stadiamaps.com/tiles/${style}/{z}/{x}/{y}{r}.png${query}`}
      attribution='&copy; <a href="https://stadiamaps.com/" target="_blank" rel="noreferrer">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank" rel="noreferrer">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
      maxNativeZoom={20}
      // Only fetch tiles once a zoom or fly-to has finished, not at every step along the way.
      updateWhenZooming={false}
      updateWhenIdle
      noWrap
    />
  );
};

export default ThemedTileLayer;
