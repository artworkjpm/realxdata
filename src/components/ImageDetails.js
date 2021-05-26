import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Mapbox from "./Mapbox/Mapbox";

export default function ImageDetails({ user, photoId }) {
	const { getGeoLocation, getUserDetails, getPhotoFromUrl, clickedImage, loading, geoLocation } = useContext(PhotoContext);
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
							<img src={clickedImage.imageUrl} alt={clickedImage.title.replace(/['"]+/g, "")} width="100%" />
						</div>
						<div>
							{geoLocation.long ? (
								<div>
									<Mapbox geoLocation={geoLocation} />
									<p>
										<b>Country:</b> {geoLocation.data.country._content.replace(/['"]+/g, "")}
									</p>
									<p>
										<b>County:</b> {geoLocation.data.county._content.replace(/['"]+/g, "")}
									</p>
									<p>
										<b>Neighbourhood:</b> {geoLocation.data.neighbourhood._content.replace(/['"]+/g, "")}
									</p>
									<p>
										<b>Region:</b> {geoLocation.data.region._content.replace(/['"]+/g, "")}
									</p>
								</div>
							) : (
								"No location data"
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
