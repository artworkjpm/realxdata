import React from "react";

const Image = ({ url, title, OnGeolocation }) => (
	<li>
		<img src={url} alt={title} onClick={OnGeolocation} />
	</li>
);

export default Image;
