import React, { useState, useCallback, memo } from 'react';

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import GOOGLE_MAP_API from 'constants/google-map-api';

const containerStyle = {
  width: '100%',
  height: '400px',
};

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
    <div className="container mx-auto mb-6">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markers.map(({ coordinates, title }, i) => (
          <Marker key={i} position={coordinates} title={title} />
        ))}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default memo(Map);
