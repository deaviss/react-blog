import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron/Jumbotron';
import { connect } from 'react-redux'
import { fetchPosts } from '../redux/actions/post-actions'
import PostList from '../components/Post/PostList';
// import Post from '../components/Post/Post';


const mapStateToProps = state => ({
	posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(class Home extends Component {

	componentWillMount() {
		this.props.fetchPosts();
	}

	render() {
		console.log(this.props)
		return (
			<div>
				<Jumbotron 
					header={"Homepage of my blog"}
					content={"This is just a demo that shows my blog engine in React.js with comment section"}
				/>
				<section className="sections section_a">
					{this.props.posts.map(e=>(
						<PostList post={e} key={e.id} />
					))}
			</section>
			</div>
		)
	}
})