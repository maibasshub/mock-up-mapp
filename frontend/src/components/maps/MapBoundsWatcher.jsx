import { useMapEvent } from "react-leaflet";

export const MapBoundsWatcher = ({ onBoundsChange }) => {
  useMapEvent('moveend', (e) => {
    const map = e.target;
    const bounds = map.getBounds();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();

    onBoundsChange({
      ne: { lat: northEast.lat, lng: northEast.lng },
      sw: { lat: southWest.lat, lng: southWest.lng },
    });
  });

  return null;
}
