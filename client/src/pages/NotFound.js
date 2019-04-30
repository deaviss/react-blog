import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron/Jumbotron';

export default class NotFound extends Component {
	render() {
		return (
			<div>
				<Jumbotron
					header={"Sorry!"}
					content={"The page you're looking for does not exsist."}
				/>
			</div>
		)
	}
}
