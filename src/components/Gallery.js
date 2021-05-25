import React, { useContext } from "react";
import NoImages from "./NoImages";
import Image from "./Image";
import { PhotoContext } from "../context/PhotoContext";
import { withRouter } from "react-router-dom";
const Gallery = (props) => {
	const results = props.data;
	let images;
	let noImages;
	const { getGeoLocation, getUserDetails } = useContext(PhotoContext);

	function OnGeolocation(imageDetails, imgUrl) {
		getGeoLocation(imageDetails, imgUrl);
		getUserDetails(imageDetails.owner);
		props.history.push(`/image-details/${imageDetails.id}`);
	}

	// map variables to each item in fetched image array and return image component
	if (results.length > 0) {
		images = results.map((image) => {
			let farm = image.farm;
			let server = image.server;
			let id = image.id;
			let secret = image.secret;
			let title = image.title;
			let url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
			return <Image url={url} key={id} alt={title} OnGeolocation={() => OnGeolocation(image, url)} />;
		});
	} else {
		noImages = <NoImages />; // return 'not found' component if no images fetched
	}
	return (
		<div>
			<ul>{images}</ul>
			{noImages}
		</div>
	);
};

export default withRouter(Gallery);
