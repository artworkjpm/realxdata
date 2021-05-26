import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Mapbox from "./Mapbox/Mapbox";

export default function ImageDetails({ user, photoId }) {
	const { getGeoLocation, getUserDetails, getPhotoFromUrl, clickedImage, loading, geoLocation } = useContext(PhotoContext);
	console.log(geoLocation);

	useEffect(() => {
		getUserDetails(user);
		getPhotoFromUrl(photoId);
		getGeoLocation(photoId);
		// eslint-disable-next-line
	}, []);

	function goBack() {
		window.history.back();
	}

	return (
		<div className="image-details">
			<div className="go-back">
				<div onClick={() => goBack()}>{"<"} back to search</div>
			</div>
			{!loading && (
				<div>
					<div className="avatar-name image-details">
						<h2>{clickedImage.title.replace(/['"]+/g, "")}</h2>
					</div>

					<div className="info-container">
						<div>
							<img src={clickedImage.imageUrl} alt="" />
						</div>
						<div>{geoLocation.long ? <Mapbox geoLocation={geoLocation} /> : "No location data"}</div>
					</div>
				</div>
			)}
		</div>
	);
}
