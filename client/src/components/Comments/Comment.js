import React, { Component } from 'react'

export default class Comment_ extends Component {
	render() { 
		var {comment} = this.props;
		return (
			<div >
				<i className="far fa-user floatLeft"></i>
				<div className="comments_comment">
					<div className="comments_info">
						<div className="comments_author">
							{comment.name}
						</div>
					</div>
					<div className="comments_content">
						{comment.content}
					</div>
					<div className="comments_additional">
						<div className="comments_votes">
							<i className="fas fa-thumbs-up"></i>{comment.upvotes}
						</div>
						<div className="comments_votes">
							<i className="fas fa-thumbs-down"></i>{comment.downvotes}
						</div>
						
						<div className="comments_date">
							{comment.date}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
