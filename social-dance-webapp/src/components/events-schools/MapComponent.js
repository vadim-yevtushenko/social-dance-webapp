import React, {useEffect, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import * as L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import CurrentLocationMarkerComponent from "./CurrentLocationMarkerComponent";

const MapComponent = ({ isSetLocation = false, position, name = "Your destination", setLat, setLng, zoom = 17 }) => {
    const [coordinates, setCoordinates] = useState([...position])

    useEffect(() => {
        setCoordinates(position)
    }, [position])

    L.Marker.prototype.options.icon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [28, 46],
        iconAnchor: [10, 25],
    });

    const MapEvents = () => {
        useMapEvents({
            click(e) {
                setLat(e.latlng.lat)
                setLng(e.latlng.lng)
            },
        });
        return false;
    }

    function ChangeView({ center, zoom }) {
        const map = useMap();
        map.setView(center, zoom);
        return null;
    }

    return (
        // Important! Always set the container height explicitly
        <div className="w-full md:max-w-2xl lg:max-w-4xl">
            <MapContainer
                style={{ height: "450px", width: "100%" }}
                center={coordinates}
                zoom={zoom}
                scrollWheelZoom={false}
                fadeAnimation={true}
                markerZoomAnimation={true}
            >
                <ChangeView center={coordinates} zoom={zoom} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <CurrentLocationMarkerComponent/>
                {isSetLocation && <MapEvents />}
                <Marker
                    position={coordinates}
                >
                    <Popup>
                        {name}
                    </Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}

export default MapComponent