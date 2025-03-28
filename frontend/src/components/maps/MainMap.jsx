import React, { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import './MainMap.css';

import { MapBoundsWatcher } from "./MapBoundsWatcher"
import { MapInitFetcher } from "./MapInitFetcher";

export const MainMap = () => {
  const [geoPoints, setGeoPoints] = useState([]);

  // 初期座標として東京駅の座標をひとまず使うこととする
  const tokyo_station = [35.6813, 139.767066];

  const fetchPointsWithinBounds = (bounds) => {
    // 表示する地図の座標をparamsとしてrailsに送る
    const params = new URLSearchParams({
      ne_lat: bounds.ne.lat,
      ne_lng: bounds.ne.lng,
      sw_lat: bounds.sw.lat,
      sw_lng: bounds.sw.lng,
    });

    fetch(`http://localhost:3000/api/v1/geo_points?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const points = data.geo_points.map((point) => {
          const match = point.lonlat.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
          return match
            ? {
              id: point.id,
              name: point.name,
              description: point.description,
              lat: parseFloat(match[2]),
              lng: parseFloat(match[1]),
            }
            : null;
        }).filter(Boolean);
        setGeoPoints(points);
      })
      .catch((error) => console.error("Failed to fetch geo points", error));
  };

  return (
    <MapContainer center={tokyo_station} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapInitFetcher onInitialBounds={fetchPointsWithinBounds} />
      <MapBoundsWatcher onBoundsChange={fetchPointsWithinBounds} />

      {geoPoints.map((point) => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Popup>
            <b>{point.name}</b>
            <p>{point.description}</p>
          </Popup>
        </Marker>
      ))}

    </MapContainer>

  );
};
