import React, { Component } from 'react'
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import RegisterForm from '../../components/Loging/RegisterForm';

export default class Register extends Component {
	render() {
		return (
			<div>
				 <Jumbotron
					 header={"Fill your user credentials"}
					 content={"To proceed"}
					/>
					<RegisterForm />
			</div>
		)
	}
}
