import React, { useEffect, useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";

const CurrentLocationMarkerComponent = () => {
    const [position, setPosition] = useState(null);
    const [bbox, setBbox] = useState([]);

    const map = useMap();

    useEffect(() => {
        map.locate().on("locationfound", function (e) {
            setPosition(e.latlng);
            // map.flyTo(e.latlng, map.getZoom());
            const radius = 10;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
            setBbox(e.bounds.toBBoxString().split(","));
        });
    }, [map]);

    return position === null ? null : (
        <Marker position={position} opacity={0}>
            <Popup>
                You are here.
            </Popup>
        </Marker>
    );
}

export default CurrentLocationMarkerComponent