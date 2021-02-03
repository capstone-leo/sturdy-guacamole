import React, { useState } from 'react';

const LandingPage = () => {
	const [showInstructions, setShowInstructions] = useState('false');

	const showDirections = (event) => {
		event.preventDefault();

		setShowInstructions(!showInstructions);
	};
	return (
		<div>
			<header>Aether</header>
			<button type='button' onClick={showDirections}>
				view instructions
			</button>{' '}
			{showDirections ? (
				<p>
					“Never follow anyone else’s path. Unless you’re in the woods and you’re lost
					and you see a path. Then by all means follow that path.”
				</p>
			) : null}
			{/* <button></button>
			<button></button> */}
		</div>
	);
};
export default LandingPage;
