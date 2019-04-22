import React, { Component } from 'react'

export default class Post_ extends Component {
	
	render() {
		var {post, loading} = this.props.state
		return (
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
		)
	}
}
