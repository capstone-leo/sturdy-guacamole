import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Particles from 'react-particles-js';

const LandingPage = () => {
	const [showInstructions, setShowInstructions] = useState(false);

	const showDirections = (event) => {
		event.preventDefault();

		setShowInstructions(!showInstructions);
	};
	return (
		<div style={{ textAlign: 'center', marginTop: '15%', fontSize: '60px' }}>
			<header>a e t h e r</header>
			<p style={{ fontSize: '15px' }}>(working title)</p>
			<button
				type='button'
				onClick={showDirections}
				style={{ textAlign: 'center', marginTop: '10%', fontSize: '15px' }}
			>
				view instructions
			</button>
			{showInstructions ? (
				<ol style={{ textAlign: 'center', marginTop: '0%', fontSize: '15px' }}>
					<li>“One band. One Sound.”</li>
					<li>"If you ain't first, you're last" </li>
					<li>"You shall not pass!"</li>
					<li>"I am McLovin"</li>
					<li>
						"Life is like a box of chocolates, you never know what you're gonna get"
					</li>
				</ol>
			) : null}
			<br />
			<Link to='/sesh'>
				<button type='button' style={{ textAlign: 'center', marginTop: '1%' }}>
					Start Jamming {'>'}
				</button>
			</Link>
			<br />
			<Particles
				params={{
					particles: {
						line_linked: {
							shadow: {
								enable: true,
								color: '#3CA9D1',
								blur: 5
							}
						}
					}
				}}
				style={{
					width: '100%'
				}}
			/>
		</div>
	);
};
export default LandingPage;
