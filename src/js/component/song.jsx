import React, { useState, useEffect } from "react";

export const Songs = props => {
	const files = [
		{
			name: "Cancion 1",
			link:
				"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"
		},
		{
			name: "Cancion 2",
			link:
				"https://assets.breatheco.de/apis/sound/files/mario/songs/hurry-starman.mp3"
		}
	];
	let [url, setUrl] = useState("");

	async function myFetch() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/sound/all"
		);
		if (!response.ok) {
			throw new Error(response.status);
		} else {
			return await response.json();
		}
	}
	myFetch()
		.then(songsArray => {
			// useEffect(
			// 	() => {
			// 		songsArray.map((file, index) => {
			// 			setUrl(file.url);
			// 		});
			// 	},
			// 	[url]
			// );
			console.log(songsArray);
		})
		.catch(error => {
			console.log("Something went wrong", error);
		});

	return (
		<div>
			<audio autoPlay controls id="myAudio">
				<source src={url} type="audio/mpeg" />
			</audio>
			<ol>
				{files.map((file, index) => {
					return (
						<li
							key={index}
							onClick={() => {
								setUrl(file.link);
								console.log(url);
							}}>
							{file.name}
						</li>
					);
				})}
			</ol>

			{/* <button
				onClick={() => {
					myAudio.play();
				}}>
				Play
			</button>
			<button
				onClick={() => {
					myAudio.pause();
				}}>
				Pause
			</button> */}
			{/* <button
				onClick={() => {
					setSongPlayingsong(playing => songPlaying + 1);
				}}>
				Pause
			</button> */}
		</div>
	);
};
