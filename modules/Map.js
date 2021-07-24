import React, { useState, useCallback, memo } from 'react';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import GOOGLE_MAP_API from 'constants/google-map-api';

const center = GOOGLE_MAP_API.defaultLocation;
const zoom = GOOGLE_MAP_API.defaultZoom;

const Map = ({ markers = [] }) => {
  const { isLoaded } = useLoadScript({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAP_API.apiKey,
  });

  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === 'Escape') {
        selectedLocation(null);
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

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
      {markers.map((location, i) => (
        <Marker
          key={i}
          position={location.coordinates}
          title={location.title}
          onClick={() => {
            setSelectedLocation(location);
          }}
        />
      ))}

      {selectedLocation && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedLocation(null);
          }}
          position={{
            lat: selectedLocation.coordinates.lat,
            lng: selectedLocation.coordinates.lng,
          }}
        >
          <div className="map-info-window">
            <h5>
              {selectedLocation.url ? (
                <a href={selectedLocation.url} target="_blank">
                  {selectedLocation.title}
                </a>
              ) : (
                <>{selectedLocation.title}</>
              )}
            </h5>
            <p>{selectedLocation.region}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default memo(Map);
