import React, { useState, useCallback, memo } from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import GOOGLE_MAP_API from 'constants/google-map-api';

const center = GOOGLE_MAP_API.defaultLocation;
const zoom = GOOGLE_MAP_API.defaultZoom;

const Map = ({ markers = [] }) => {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_API.apiKey,
  });

  const [map, setMap] = useState(null);

  const onLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      if (markers[i].coordinates) {
        const { lat, lng } = markers[i].coordinates;
        bounds.extend({ lat, lng });
      }
    }

    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
    map.setZoom(map.getZoom() - 1);
    setMap(map);
  };

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      mapContainerClassName="map-container"
    >
      {markers.map(({ coordinates, title }, i) => (
        <Marker key={i} position={coordinates} title={title} />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
