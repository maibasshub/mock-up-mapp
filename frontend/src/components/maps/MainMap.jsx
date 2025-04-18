import React, { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import './MainMap.css';

import { MapBoundsWatcher } from "./MapBoundsWatcher"
import { MapInitFetcher } from "./MapInitFetcher";

export const MainMap = () => {
  const [mcdonaldsPoints, setMcdonaldsPoints] = useState([]);

  // 初期座標として東京駅の座標をひとまず使うこととする
  const TOKYO_STATION = [35.6813, 139.767066];

  const fetchPointsWithinBounds = (bounds) => {
    // 表示する地図の座標をparamsとしてrailsに送る
    const params = new URLSearchParams({
      ne_lat: bounds.ne.lat,
      ne_lng: bounds.ne.lng,
      sw_lat: bounds.sw.lat,
      sw_lng: bounds.sw.lng,
    });

    fetch(`http://localhost:3000/api/v1/mcdonalds_points?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        const points = data.mcdonalds_points.map((point) => {
          const match = point.geography.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
          return match
            ? {
              name: point.name,
              branch: point.branch,
              lat: parseFloat(match[2]),
              lng: parseFloat(match[1]),
            }
            : null;
        }).filter(Boolean);
        setMcdonaldsPoints(points);
      })
      .catch((error) => console.error("Failed to fetch geo points", error));
  };

  return (
    <MapContainer center={TOKYO_STATION} zoom={12} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapInitFetcher onInitialBounds={fetchPointsWithinBounds} />
      <MapBoundsWatcher onBoundsChange={fetchPointsWithinBounds} />

      <MarkerClusterGroup>
        {mcdonaldsPoints.map((marker) => (
          <Marker position={[marker.lat, marker.lng]}>
            <Popup>
              <b>{marker.name}</b>
              <p>{marker.branch}</p>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

    </MapContainer>

  );
};
