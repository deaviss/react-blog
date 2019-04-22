import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Jumbotron from '../components/Jumbotron/Jumbotron'
import Post_ from '../components/Post/Post';
import Comments from '../components/Comments/Comments';
export default class Post extends Component {

	state = {
		post: {},
		loading: true,
		id: undefined
	}

	componentDidMount() {
		fetch(`http://localhost:1332/getPost/?id=${this.props.match.params.id}`)
		.then(res => res.json() )
		.then(res => this.setState({post: res, loading: false, id: res.id}))
		.catch(res => console.log(res))
	}

	render() {
		var { post } = this.state;
		var jumboTron;
		if(this.state.loading)
			jumboTron =
				<Jumbotron
					header={"Loading title"}
					content={"Loading description" + " @blog"}
				/>
		else
		jumboTron =
			<Jumbotron
				header={post.title}
				content={post.author + " @blog"}
			/>

		
		return (
			<div>
				{jumboTron}
				<Post_ state={this.state} />
				<Comments id={this.props.match.params.id} />
			</div>
		)
	}
}
