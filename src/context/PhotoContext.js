import React, { useEffect, createContext, useState } from "react";
import axios from "axios";
import { apiKey } from "../api/config";
export const PhotoContext = createContext();

const PhotoContextProvider = (props) => {
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [searchText, setSearchText] = useState("");
	const [savedUrls, setSavedUrls] = useState([]);
	const [savedViewedData, setSavedViewedData] = useState([{ url: "", data: [] }]);

	useEffect(() => {
		const runSearch = (searchText) => {
			axios
				.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchText}&per_page=24&format=json&nojsoncallback=1`)
				.then((response) => {
					setImages(response.data.photos.photo);
					setLoading(false);
					setSavedUrls([...savedUrls, searchText]);
					setSavedViewedData([...savedViewedData, { url: searchText, data: response.data.photos.photo }]);
				})
				.catch((error) => {
					console.log("Encountered an error with fetching and parsing data", error);
				});
		};

		if (searchText) {
			if (savedUrls.indexOf(searchText) === -1) {
				runSearch(searchText);
			} else {
				let result = savedViewedData.filter((o) => o.url.toLowerCase() === searchText.toLowerCase());
				if (result.length > 0) {
					setImages(result[0].data);
					setLoading(false);
				}
			}
		}
	}, [searchText, savedUrls, savedViewedData]);

	return <PhotoContext.Provider value={{ images, loading, searchText, setSearchText, savedUrls, savedViewedData }}>{props.children}</PhotoContext.Provider>;
};

export default PhotoContextProvider;
