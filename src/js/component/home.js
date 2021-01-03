import React, { useState, useEffect } from "react";
import { Player } from "./player.jsx";

export function Home() {
	// const [playing, setPlaying] = useState(false);
	// let mySong = document.querySelector("#0");
	return (
		<div className="container">
			<Player />
		</div>
	);
}
