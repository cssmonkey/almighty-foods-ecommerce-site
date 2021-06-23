import React, { useState, useCallback, memo } from 'react';

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import GOOGLE_MAP_API from 'constants/google-map-api';

const containerStyle = {
  width: '700px',
  height: '900px',
};

const center = GOOGLE_MAP_API.defaultLocation;
const zoom = GOOGLE_MAP_API.defaultZoom;

const Map = ({ markers = [] }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_API.apiKey,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    // const bounds = new window.google.maps.LatLngBounds();
    // map.fitBounds(bounds);
    // debugger;
    // setMap(map);
    const bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      if(markers[i].coordinates) {
        return;
      }
      const {lat, lng} = markers[i].coordinates;
      bounds.extend({lat, lng});
    }

    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
    map.setZoom(map.getZoom()-1); 
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: 50.736129,
        lng: -1.988229,
      }}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      { markers.map(({coordinates, title}, i) => <Marker key={i} position={coordinates} title={title} />) }
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
