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
	const [userDetails, setUserDetails] = useState({ user: "", avatar: "" });
	const [clickedImage, setClickedImage] = useState({ data: {}, title: "", imageUrl: "" });
	const [itemsWithGeo, setItemsWithGeo] = useState([]);
	const [checkBox, setCheckBox] = useState(false);

	useEffect(() => {
		setCheckBox(false);
		const runSearch = (searchText) => {
			setLoading(true);
			axios
				.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchText}&per_page=24&format=json&nojsoncallback=1`)
				.then((response) => {
					setImages(response.data.photos.photo);
					setLoading(false);
					setSavedUrls([...savedUrls, searchText]);
					setSavedViewedData([...savedViewedData, { url: searchText, data: response.data.photos.photo }]);
					filterGeos(response.data.photos.photo);
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
					filterGeos(result[0].data);
				}
			}
		}
	}, [searchText, savedUrls, savedViewedData]);

	const getGeoLocation = (photo_id) => {
		setLoading(true);
		axios
			.get(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${photo_id}&format=json&nojsoncallback=1`)
			.then((response) => {
				if (response.data.photo) {
					setGeoLocation({ lat: response.data.photo.location.latitude, long: response.data.photo.location.longitude });
				} else {
					setGeoLocation({ lat: "", long: "" });
				}
				setLoading(false);
			})
			.catch((error) => {
				console.log("Encountered an error with fetching and parsing data", error);
			});
	};
	const getUserDetails = (user_id) => {
		setLoading(true);
		axios
			.get(`https://api.flickr.com/services/rest/?method=flickr.people.getInfo&api_key=${apiKey}&user_id=${user_id}&format=json&nojsoncallback=1`)
			.then((response) => {
				setUserDetails({ user: response.data.person, avatar: `http://farm${response.data.person.iconfarm}.staticflickr.com/${response.data.person.iconserver}/buddyicons/${response.data.person.nsid}.jpg` });
				setLoading(false);
			})
			.catch((error) => {
				console.log("Encountered an error with fetching and parsing data", error);
			});
	};

	const getPhotoFromUrl = (photo_id) => {
		setLoading(true);
		axios
			.get(`https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=${apiKey}&photo_id=${photo_id}&format=json&nojsoncallback=1`)
			.then((response) => {
				setClickedImage({ data: response.data.photo, title: response.data.photo.title._content, imageUrl: `https://farm${response.data.photo.farm}.staticflickr.com/${response.data.photo.server}/${response.data.photo.id}_${response.data.photo.secret}_m.jpg` });
				setLoading(false);
			})
			.catch((error) => {
				console.log("Encountered an error with fetching and parsing data", error);
			});
	};

	function filterGeos(imagesArray) {
		setItemsWithGeo([]);
		let a = [];
		imagesArray.forEach((item) => {
			axios
				.get(`https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=${apiKey}&photo_id=${item.id}&format=json&nojsoncallback=1`)
				.then((response) => {
					if (response.data.photo) {
						a.push(response.data.photo.id);
						setItemsWithGeo(a);
					}
				})
				.catch((error) => {
					console.log("Encountered an error with fetching and parsing data", error);
				});
		});
	}

	return <PhotoContext.Provider value={{ images, loading, setLoading, searchText, setSearchText, savedUrls, savedViewedData, getGeoLocation, geoLocation, getUserDetails, userDetails, getPhotoFromUrl, clickedImage, setGeoLocation, setUserDetails, setClickedImage, itemsWithGeo, setItemsWithGeo, setImages, checkBox, setCheckBox }}>{props.children}</PhotoContext.Provider>;
};

export default PhotoContextProvider;
