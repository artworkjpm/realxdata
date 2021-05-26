import React, { useContext } from "react";
import NoImages from "./NoImages";
import Image from "./Image";

import { withRouter } from "react-router-dom";
import { PhotoContext } from "../context/PhotoContext";
const Gallery = (props) => {
	const { setGeoLocation, setUserDetails, setClickedImage } = useContext(PhotoContext);
	const results = props.data;
	let images;
	let noImages;

	function OnGeolocation(photo_id, user) {
		setGeoLocation({ lat: "", long: "", data: {} });
		setUserDetails({ user: "", avatar: "" });
		setClickedImage({ data: {}, title: "", imageUrl: "" });
		props.history.push(`/${user}/${photo_id}`);
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
			return <Image url={url} key={id} alt={title} OnGeolocation={() => OnGeolocation(id, image.owner)} />;
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
