import React, { useState, useEffect } from "react";

export const Songs = props => {
	let [finalUrl, setFinalUrl] = useState("");

	async function myFetch() {
		let response = await fetch(
			"https://assets.breatheco.de/apis/sound/songs"
		);
		if (!response.ok) {
			throw new Error(response.status);
		} else {
			return await response.json();
		}
	}
	let myArray = [];
	myFetch()
		.then(songsArray => {
			let myUrl = "https://assets.breatheco.de/apis/sound/";
			let myCompleteUrl = "";
			for (let index = 0; index < songsArray.length; index++) {
				myCompleteUrl = myUrl.concat(songsArray[index].url); //concatena el principio de la url con el final, que es cada elemento del array que devuelve fetch en la propiedad url de cada objeto
				myArray.push(myCompleteUrl);
			}
		})
		.catch(error => {
			console.log("Something went wrong", error);
		});
	console.log(myArray); // tenemos un array de todos los url

	// return (
	// 	<div>
	// 		<audio autoPlay controls id="myAudio">
	// 			<source src={finalUrl} type="audio/mpeg" />
	// 		</audio>
	// 		<ol>
	// 			{myArray.map((file, index) => {
	// 				return (
	// 					<li
	// 						key={index}
	// 						onClick={() => {
	// 							setFinalUrl(file);
	// 							console.log(finalUrl);
	// 						}}>
	// 						Cancion
	// 					</li>
	// 				);
	// 			})}
	// 		</ol>

	// 		{/* <button
	// 			onClick={() => {
	// 				myAudio.play();
	// 			}}>
	// 			Play
	// 		</button>
	// 		<button
	// 			onClick={() => {
	// 				myAudio.pause();
	// 			}}>
	// 			Pause
	// 		</button> */}
	// 		{/* <button
	// 			onClick={() => {
	// 				setSongPlayingsong(playing => songPlaying + 1);
	// 			}}>
	// 			Pause
	// 		</button> */}
	// 	</div>
	// );
};
