// src/components/FooterMap.tsx
"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'; 


const BOGOR_COORDS: [number, number] = [-6.5944, 106.7892]; 

export function FooterMap() {
    return (
        <div className="w-full h-full rounded-lg overflow-hidden shadow-lg">
            <MapContainer 
                center={BOGOR_COORDS} 
                zoom={14} 
                scrollWheelZoom={false}
                
                className="w-full h-full min-h-[250px] z-0" 
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={19}
                />
                <Marker position={BOGOR_COORDS}>
                    <Popup>
                        Kantor BKAD Kota Bogor
                    </Popup>
                </Marker>
            </MapContainer>
            <p className="text-xs text-gray-400 p-1 text-center bg-gray-900">
                Lokasi Kantor BKAD Kota Bogor
            </p>
        </div>
    );
}