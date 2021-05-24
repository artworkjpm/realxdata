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
	const [geoLocation, setGeoLocation] = useState({ lat: "", long: "" });

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

	const getMap = (photo_id) => {
		axios
			.get(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${photo_id}&format=json&nojsoncallback=1`)
			.then((response) => {
				console.log(response);
				setGeoLocation({ lat: response.data.photo.location.latitude, long: response.data.photo.location.longitude });
			})
			.catch((error) => {
				console.log("Encountered an error with fetching and parsing data", error);
			});
	};

	return <PhotoContext.Provider value={{ images, loading, searchText, setSearchText, savedUrls, savedViewedData, getMap, geoLocation }}>{props.children}</PhotoContext.Provider>;
};

export default PhotoContextProvider;
