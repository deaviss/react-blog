import React, { Component } from 'react'

export default class LoginForm extends Component {
	state = {
		login: '',
		password: '',
		email: ''
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault();

		fetch('http://localhost:1332/login',{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(res => {
			console.log(res.message)
			if(res.user.canLogin == true){
				console.log('zalogowano')
			}else {
				console.log('nie zalogowano')
			}
		})
	}

	render() {
		return (
			<section className="sections section_a">
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="login" minLength={3} value={this.state.login} onChange={this.handleChange} className="question" id="nme" required autoComplete="off" />
  				<label htmlFor="nme"><span className="s">Login</span></label>
					<input type="password" minLength={3} name="password" value={this.state.password} onChange={this.handleChange} className="question" id="pwd" required autoComplete="off" />
  				<label htmlFor="pwd"><span className="s">Password</span></label>
					<input type="submit" value="Login" />
				</form>
			</section>
		)
	}
}
