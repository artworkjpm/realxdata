import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const Mapbox = ({ geoLocation }) => {
	console.log(Number(geoLocation.lat), Number(geoLocation.long));
	console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
	const mapContainerRef = useRef(null);

	// initialize map when component mounts
	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapContainerRef.current,
			// See style options here: https://docs.mapbox.com/api/maps/#styles
			style: "mapbox://styles/mapbox/streets-v11",
			center: [Number(geoLocation.long), Number(geoLocation.lat)],
			zoom: 10,
		});

		// add navigation control (the +/- zoom buttons)
		map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

		// clean up on unmount
		return () => map.remove();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return <div className="map-container" ref={mapContainerRef} />;
};

export default Mapbox;
