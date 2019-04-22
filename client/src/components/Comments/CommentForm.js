import React, { Component } from 'react'
import axios from 'axios'
export default class CommentForm extends Component {


	state = {
		name: '',
		text: ''
	}

	postComment = () => {
		var d = new Date();
		var dzien = d.getDate();
		var miesiac = d.getMonth() + 1
		var rok = d.getFullYear()
		var time = `${d.getHours()}:${d.getMinutes()}`
		var data = `${dzien}.${miesiac}.${rok} - ${time}`;
		axios.post('http://localhost:1332/addComment', {
			name: this.state.name,
			content: this.state.text,
			postId: this.props.postId,
			date: data,
			upvotes: 0,
			downvotes: 0
		})
		.then(res => res)
		.then(res => console.log(res.data))
	}

	handleChange = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.postComment();
	} 

	render() {
		console.log(this.props)
		return (
			<form className="comment_form" onSubmit={this.handleSubmit}>
				<span className="s">Nick</span>
				<input type="text" name="name" minLength={3} value={this.state.name} onChange={this.handleChange} className="input" id="nme" required autoComplete="off" />
				
				<span className="s">Comment</span>
				<textarea name="text" minLength={20} value={this.state.text} onChange={this.handleChange}  required id="txt" className="input"></textarea>
				
				<input type="submit" className="submit_btn" value="Post" />
			</form>
		)
	}
}
