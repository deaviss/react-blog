import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron/Jumbotron';
import PostList from '../components/Post/PostList';

export default class Home extends Component {

	state = {
		posts: [],
		loading: true
	}

	componentDidMount() {
		fetch(`http://localhost:1332/getAllPosts`)
		.then(res => res.json() )
		.then(res => this.setState({posts: res, loading: false}))
		.catch(res => console.log(res))
	}

	render() {
		return (
			<div>
				<Jumbotron 
					header={"Homepage of my blog"}
					content={"This is just a demo that shows my blog engine in React.js with comment section"}
				/>
				<section className="sections section_a">
					{this.state.posts.map(e=>(
						<PostList post={e} key={e.id} />
					))}
			</section>
			</div>
		)
	}
}