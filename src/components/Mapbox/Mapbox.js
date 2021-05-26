import React, { useRef, useEffect } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Mapbox = ({ geoLocation }) => {
	const mapContainerRef = useRef(null);

	// initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			// See style options here: https://docs.mapbox.com/api/maps/#styles
			style: "mapbox://styles/mapbox/streets-v11",
			center: [Number(geoLocation.long), Number(geoLocation.lat)],
			zoom: 3,
		});

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

		new mapboxgl.Marker().setLngLat([Number(geoLocation.long), Number(geoLocation.lat)]).addTo(map);

		// clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapbox;
