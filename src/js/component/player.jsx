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

	const playPause = () => {
		if (onPlay) {
			player.pause();
			setOnPlay(false);
		} else {
			player.play();
			setOnPlay(true);
		}
	};

	const nextSong = () => {
		for (let index = 0; index < songsList.length; index++) {
			if (urlAPI.concat(songsList[index].url) == songURL) {
				setSongURL(urlAPI.concat(songsList[index + 1].url));
				player.load();
				player.play();
				setOnPlay(true);
			}
		}
	};

	const previousSong = () => {
		for (let index = 0; index < songsList.length; index++) {
			if (urlAPI.concat(songsList[index].url) == songURL) {
				setSongURL(urlAPI.concat(songsList[index - 1].url));
				player.load();
				player.play();
				setOnPlay(true);
			}
		}
	};

	return (
		<Fragment>
			<h1 className="centering">Arcade audio player</h1>
			<ul>
				{songsList.map(eachSong => {
					return (
						<li
							className={
								urlAPI.concat(eachSong.url) == songURL
									? "yellow"
									: "gray"
							}
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
			<div className="centering">
				<button
					className="push--skeuo"
					onClick={() => {
						previousSong();
					}}>
					<i className="fa fa-backward" />
				</button>
				<button
					className="push--skeuo"
					onClick={() => {
						playPause();
					}}>
					<i className="fa fa-pause" />
				</button>
				<button
					className="push--skeuo"
					onClick={() => {
						if (songURL == "") {
							setSongURL(urlAPI.concat(songsList[0].url));
							player.load();
							setOnPlay(true);
							player.play();
						} else {
							playPause();
						}
					}}>
					<i className="fa fa-play" />
				</button>
				<button
					className="push--skeuo"
					onClick={() => {
						nextSong();
					}}>
					<i className="fa fa-forward" />
				</button>
			</div>
			<audio id="player">
				<source src={songURL} type="audio/mpeg" />
			</audio>
		</Fragment>
	);
};
