'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

interface LeafletMapProps {
  lat: number;
  lng: number;
}

const LeafletMap = ({ lat, lng }: LeafletMapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remove existing map if any
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Only create the map once the container exists
    if (mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([lat, lng], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      L.marker([lat, lng]).addTo(mapRef.current).bindPopup("Parcel's current location.");
    }

    // Cleanup on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: '100%',
        width: '100%',
        borderRadius: '0.5rem',
      }}
    />
  );
};

export default LeafletMap;
