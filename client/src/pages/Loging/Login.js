import React, { Component } from 'react'
import Jumbotron from '../../components/Jumbotron/Jumbotron';
import LoginForm from '../../components/Loging/LoginForm';

export default class Login extends Component {
	render() {
		return (
			<div>
				 <Jumbotron
					 header={"Login site"}
					 content={"Type your credentials to log in"}
					/>
					<LoginForm />
			</div>
		)
	}
}
