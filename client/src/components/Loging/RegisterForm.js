import React, { Component } from 'react'
import '../../css/Loging.css'

export default class RegisterForm extends Component {


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

		fetch('http://localhost:1332/register',{
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(this.state)
		})
		.then(res => res.json())
		.then(res => console.log(res));
	}

	render() {
		return (
			<section className="sections section_a">
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="login" value={this.state.login} onChange={this.handleChange} className="question" id="nme" required autoComplete="off" />
  				<label htmlFor="nme"><span className="s">Login</span></label>
					<input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="question" id="pwd" required autoComplete="off" />
  				<label htmlFor="pwd"><span className="s">Password</span></label>
					<input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="question" id="eml" required autoComplete="off" />
  				<label htmlFor="eml"><span className="s">Email</span></label>
					<input type="submit" value="Register" />
				</form>
			</section>
		)
	}
}
