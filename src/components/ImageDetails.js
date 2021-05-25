import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";

export default function ImageDetails(props) {
	const { getGeoLocation, getUserDetails, getPhotoFromUrl, clickedImage, loading } = useContext(PhotoContext);
	const { user, photoId } = props;
	console.log(clickedImage);

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
			{!loading && (
				<div>
					<div>{String(loading)}</div>
					<div className="go-back">
						<div onClick={() => goBack()}>{"<"} back to search</div>
					</div>

					<h2>{clickedImage.title.replace(/['"]+/g, "")}</h2>
					<img src={clickedImage.imageUrl} alt="" />
				</div>
			)}
		</div>
	);
}
