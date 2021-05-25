import React, { useContext } from "react";
import { PhotoContext } from "../context/PhotoContext";

export default function ImageDetails() {
	const { geoLocation } = useContext(PhotoContext);

	return (
		<div className="image-details">
			<h2>{geoLocation.imageData.title}</h2>
			<img src={geoLocation.imgUrl} alt={geoLocation.imageData.title} />
		</div>
	);
}
