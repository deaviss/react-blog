import React, { Component } from 'react'
import '../../css/Comments.css'
import Comment_ from './Comment'
import CommentForm from './CommentForm';
export default class Comments extends Component {

	state = {
		comments: []
	}

	componentWillMount() {
		fetch(`http://localhost:1332/getComments/?id=${this.props.id}`)
		.then(res => res.json())
		.then(res => this.setState({comments: res}))
	}

	render() {
		console.log(this.state)
		return (
			<div className="comments">
				<div className="comments_container">
					<CommentForm postId={this.props.id}/>
					<header className="comments_header">
					{this.state.comments.length == 0 && 
						<p>Brak komentarzy do tego posta</p>
					}
					{this.state.comments.length > 0 &&
						<p>Komentarze do tego posta</p>
					}
					</header>
					{this.state.comments.length > 0 && 
						this.state.comments.map(x=>(
							<Comment_ key={Math.random()} comment={x} />
							))
					}
					{/* {this.state.comments.length == 0 && 
					<div>Brak komentarzy do tego posta</div>
					} */}

					
				</div>
			</div>
		)
	}
}
