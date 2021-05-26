import React from "react";
import Container from "./Container";

const Item = ({ searchTerm }) => {
	return (
		<div>
			<div>
				<h2>{searchTerm} Pictures</h2>
			</div>

			<Container searchTerm={searchTerm} />
		</div>
	);
};

export default Item;
