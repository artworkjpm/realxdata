import React, { useContext, useEffect } from "react";
import { PhotoContext } from "../context/PhotoContext";
import Gallery from "./Gallery";
import Loader from "./Loader";

const Container = ({ searchTerm }) => {
	const { images, loading, setSearchText, setImages, itemsWithGeo, savedViewedData, searchText, checkBox, setCheckBox } = useContext(PhotoContext);
	useEffect(() => {
		setSearchText(searchTerm);
		// eslint-disable-next-line
	}, [searchTerm]);

	useEffect(() => {
		if (checkBox) {
			let newArray = [];
			images.map((item) => {
				return itemsWithGeo.forEach((el) => {
					if (item.id === el) {
						return newArray.push(item);
					}
				});
			});
			setImages(newArray);
		} else {
			let result = savedViewedData.filter((o) => o.url.toLowerCase() === searchText.toLowerCase());
			if (result.length > 0) {
				setImages(result[0].data);
			}
		}
		// eslint-disable-next-line
	}, [checkBox]);

	return (
		<div className="photo-container">
			<div className="title">
				<label className="container-input">
					Images with location map
					<input type="checkbox" name="filterGeos" id="filterGeos" onChange={() => setCheckBox(!checkBox)} checked={checkBox} className="checkInput" />
					<span className="checkmark"></span>
				</label>
			</div>

			{loading ? <Loader /> : <Gallery data={images} />}
		</div>
	);
};

export default Container;
