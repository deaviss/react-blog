import React, { Component } from 'react'

import '../../css/Posts.css'

export default class PostList extends Component {
	render() {
		const {post} = this.props;
		var shortContent = post.content.split(' ');
		var sContent = "";
		for(var i=0; i < 14; i++){
			sContent += shortContent[i] + ' ';
		}
		sContent+= "..."
		return (
			<div className="post">
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
					<p>{sContent}</p>
				</div>
				<div className="post_button_container">
					<a href={`/post/${post.id}`}>
						<span className="post_button">Read more</span>
					</a>
				</div>
			</div>
		)
	}
}
