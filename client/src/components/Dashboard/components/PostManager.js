import React, { Component } from 'react'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../css/react-draft-wysiwyg.css';
import axios from 'axios'
import { getUser } from '../../../user';


export default class PostManager extends Component {

	state = {
		editorState: EditorState.createEmpty(),
		fetching: true,
		post: {},
	}

	componentDidMount() {
		axios.post(`http://localhost:1332/getPostToEdit`, {idx: this.props.id, author: getUser().name})
		.then(res => {
			this.setState({...this.state, post: res.data, editorState: EditorState.createWithContent(convertFromRaw(res.data.content)), fetching: false})
		})
		.catch(res => console.log(res))

	}

	onChangeHandler = editorState => {
		var post = this.state.post;
		post.content = convertToRaw(editorState.getCurrentContent());
		this.setState({...this.state, editorState: editorState, post: post})
	}

	changer = e => {
		var post = this.state.post;
		post.title = e.target.value;
		this.setState({...this.state, post: post}, () => console.log(this.state))
	}

	onSubmit = e => {
		e.preventDefault();
		console.log(this.state.post)
		axios.post('http://localhost:1332/editPost', {post: this.state.post})
		.then(res=>{
			console.log(res.data)
		})
	}

	render(){
		const { editorState, post } = this.state;
		return(
			<React.Fragment>
				{this.state.fetching && <div className="loader" />}
				{!this.state.fetching && 
				<form onSubmit={this.onSubmit}>
					<h1 className="manage_h1">Editing post: {post.title}</h1>
					<input minLength={8} required placeholder="Post title" type='text' value={post.title} onChange={this.changer} className="input" style={{color: '#333'}} />
					<div className="manage_editor">
						<div className="manage_left">
							
							<div style={{border: '1px solid black'}}>
							<Editor
								editorState={editorState}
								wrapperClassName="demo-wrapper"
								editorClassName="demo-editor"
								onEditorStateChange={this.onChangeHandler}
								// toolbar={toolbar} 
							/>
							</div>
						</div>
						<div className="manage_buttons">
							<input type="submit" value="Edit" className="button green" />
							<input type="button" value="Delete" className="button red" />
						</div>
					</div>
				</form>}
			</React.Fragment>
		)
	}
}
