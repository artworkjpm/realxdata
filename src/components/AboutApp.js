import React from "react";
import styled from "styled-components";

export default function AboutApp() {
	return (
		<Container>
			<h1>About this app</h1>
			<p>This was a fun challenge, I will describe what I done and why as brief as possible</p>
			<p>
				1) The <b>### Warm-up</b> and <b>### Performance</b> were fairly straight forward, the <b>Performance</b> being slightly trickier to complete. My solution for the performance was to save each searched text and image array inside the contextApi state, then whenever the user searches a new item or clicks a new category, the call to Flickr first checks if that search value exists, if yes, I
				use that search value to filter out the correct saved array of images.
			</p>
			<p>
				2) The harder task was the <b>### New Use Case</b>, which at first was misleading because I thought it would be easy because I thought "oh just create a modal that opens up and shows a map", but as I started to code out the modal it became obvious to me that this would be a very basic solution. We need the user to first see what images have location data, because most of the images don't
				have that. Then I thought instead of a modal it would be much better to give that image its own page, which can be done quite easily with React router dynamic params. So I got the images to load to separate pages, using the photo_id and user_id as param props, then once that page is loaded I grab those values to call the Flickr API to get the location details. Of course to get the image
				and title isn't wasn't so straight forward, I had to make the image again as I want this new page to show the data from any point, not just a click event, so I have to call the Flickr API's to get the <b>getUserDetails(user); </b> <b>getPhotoFromUrl(photoId);</b> <b>getGeoLocation(photoId);</b>
			</p>
			<p>
				To filter the main gallery images to only show images that have location data wasn't so easy, I decided to give the user the option to toggle "Has location data" or not, so they can still see the full array of photos. My solution here was to create another function inside PhotoContext that runs after fetching the images, this function maps all the photo_ids and calls the getGeoLocation
				endpoint, if that photo_id has location data, save that id in another array. Then in the component I filter out the images state to only show images with those saved arrays, else, use the array of the saved arrays we made earlier.{" "}
			</p>

			<h1>Things to impress</h1>
			<ul>
				<li>Each image loads its own url page, so users could copy that url and send to other people</li>
				<li>Mapbox with marker</li>
				<li>The main gallery toggles images with and without location data</li>
				<li>All challenges completed including the performance challenge to not do unneccessary API calls</li>
			</ul>

			<h1>Ending note</h1>
			<p>I apologise for not doing this test sooner, I had two tests to complete in front of this one, frustratingly I still haven't heard any feedback from those tests so I am keen and available to start working for RealXData should you contact me.</p>
			<p>Thanks for sending me the test and I hope to get some feedback, all done before your deadline of 27th May, yoohoo!</p>
			<p>
				Contact: John Moran, Tel: 695966706, Web:{" "}
				<a href="https://jpm.netlify.app" target="_new">
					Website
				</a>
				, email: johnnymoran44@hotmail.com
			</p>
		</Container>
	);
}

const Container = styled.div`
	text-align: left;
	font-size: 20px;
	line-height: 24px;
	h1 {
		font-size: 2em;
	}
	ul {
		list-style-type: disc;
		padding-left: 40px;
	}
`;
