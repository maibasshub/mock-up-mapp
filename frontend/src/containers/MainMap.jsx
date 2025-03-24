import React, { Fragment, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import './MainMap.css';

export const MainMap = () => {
  const [geoPoints, setGeoPoints] = useState([]);

  useEffect(() => {
    // APIから地点データを取得
    fetch("http://localhost:3000/api/v1/geo_points")
      .then((res) => res.json())
      .then((data) => {
        // lonlat を {lat, lng} に変換
        const points = data.geo_points.map((point) => {
          const match = point.lonlat.match(/POINT \(([-\d.]+) ([-\d.]+)\)/);
          return match
            ? {
              id: point.id,
              name: point.name,
              description: point.description,
              lat: parseFloat(match[2]), // 緯度
              lng: parseFloat(match[1]), // 経度

            }
            : null;
        }).filter(Boolean);
        setGeoPoints(points);
      })
      .catch((error) => console.error("Failed to fetch geo points", error));
  }, []);

  return (
    <MapContainer center={[40.0, 30.0]} zoom={5} style={{ height: "500px", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

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
