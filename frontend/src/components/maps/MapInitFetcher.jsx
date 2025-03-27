import { useEffect } from "react";
import { useMap } from "react-leaflet";

export const MapInitFetcher = ({ onInitialBounds }) => {
  const map = useMap();

  useEffect(() => {
    map.whenReady(() => {
      const bounds = map.getBounds();
      const northEast = bounds.getNorthEast();
      const southWest = bounds.getSouthWest();

      onInitialBounds({
        ne: { lat: northEast.lat, lng: northEast.lng },
        sw: { lat: southWest.lat, lng: southWest.lng },
      });
    });
  }, [map]);

  return null;
};
