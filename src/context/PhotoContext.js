import React, { useEffect, createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = (props) => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		runSearch(searchText);
	}, [searchText]);

	const runSearch = (searchText) => {
		axios
			.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchText}&per_page=24&format=json&nojsoncallback=1`)
			.then((response) => {
				setImages(response.data.photos.photo);
				setLoading(false);
			})
			.catch((error) => {
				console.log("Encountered an error with fetching and parsing data", error);
			});
	};
	return <PhotoContext.Provider value={{ images, loading, searchText, setSearchText }}>{props.children}</PhotoContext.Provider>;
};

export default PhotoContextProvider;
