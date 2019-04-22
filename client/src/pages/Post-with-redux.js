import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Jumbotron from '../components/Jumbotron/Jumbotron'
import { connect } from 'react-redux'
import { fetchPost } from '../redux/actions/post-actions'

const mapStateToProps = state => ({
	post: state.posts.item
})


export default connect(mapStateToProps, { fetchPost })(class Post extends Component {


	componentWillMount() {
		this.props.fetchPost(this.props.match.params.id);
	}

	render() {
		console.log(this.props)
		var { post } = this.props.post;
		var { loading } = this.props.post;
		if(loading == false){
			var jumboTron;
			if(loading)
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
					
					
					<section className="sections section_a">
						<div className="post">
						{loading && <div className="loader centered"/>}
							<header className="post_title">
								{post.title}
							</header>
							<div className="post_about">
								<span className="post_author">
									<strong>{post.author}</strong>
								</span> 
								<span className="post_date">
									{post.createdAt}
								</span>
							</div> 
							<div className="post_content">
								<p>{post.content}</p>
							</div>
						</div>
					</section>
				</div>
			)
		}else
		return(<div>Laduje</div>)
	}
})
