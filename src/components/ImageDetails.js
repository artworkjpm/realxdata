import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";

export default function ImageDetails(props) {
	const { getGeoLocation, geoLocation, getUserDetails, getPhotoFromUrl } = useContext(PhotoContext);
	const { user, photoId } = props;

	useEffect(() => {
		getUserDetails(user);
		getPhotoFromUrl(photoId);
		getGeoLocation(photoId);

		// eslint-disable-next-line
	}, []);

	return (
		<div className="image-details">
			{/* 	<h2>{geoLocation.imageData.title}</h2>
			<img src={geoLocation.imgUrl} alt={geoLocation.imageData.title} /> */}
		</div>
	);
}
