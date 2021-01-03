import React, { useState, useEffect, Fragment } from "react";

export const Player = props => {
	let urlAPI = "https://assets.breatheco.de/apis/sound/";

	const [songsList, setSongsList] = useState([]); // TRAS EL FETCH, ESTO ES UN ARRAY DE OBJETOS QUE INCLUYEN EL ID, NOMBRE Y URL DE CADA CANCIÓN
	const [songURL, setSongURL] = useState("");
	const [onPlay, setOnPlay] = useState(false);
	const player = document.querySelector("#player");

	useEffect(() => {
		fetch(urlAPI.concat("songs"))
			.then(response => {
				if (!response.ok) {
					throw Error(response.statusText);
				} else {
					return response.json();
				}
			})
			.then(responseAsJSON => {
				setSongsList(responseAsJSON);
			})
			.catch(error => {
				console.error(
					"There was an error downloading the songs",
					error
				);
			});
	}, []);

	const playStop = () => {
		if (onPlay) {
			player.pause();
			setOnPlay(false);
		} else {
			player.load();
			player.play();
			setOnPlay(true);
		}
	};

	return (
		<Fragment>
			<h1>Arcade audio player</h1>
			<ul>
				{songsList.map(eachSong => {
					return (
						<li
							key={eachSong.url}
							onClick={() => {
								setSongURL(urlAPI.concat(eachSong.url));
								player.load();
								setOnPlay(true);
								player.play();
							}}>
							{eachSong.name}
						</li>
					);
				})}
			</ul>
			<audio id="player">
				<source src={songURL} type="audio/mpeg" />
			</audio>
		</Fragment>
	);
};
