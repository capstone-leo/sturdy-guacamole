import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import { AnimatePresence } from 'framer-motion';

import App from './App';
import LandingPage from './LandingPage';

export default class Routes extends Component {
	render() {
		return (
			// <AnimatePresence>
			<Router>
				<Route exact path='/' component={LandingPage} />
				<Route path='/sesh' component={App} />
			</Router>
			// </AnimatePresence>
		);
	}
}
