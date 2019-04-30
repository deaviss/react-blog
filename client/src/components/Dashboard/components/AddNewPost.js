import React, { Component } from 'react'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../css/react-draft-wysiwyg.css';
import axios from 'axios'
import { getUser } from '../../../user';


export default class AddNewPost extends Component {

	state = {
		editorState: EditorState.createEmpty(),
		post: {}
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
		axios.post('http://localhost:1332/addNewPost', {
			post: {
				content: this.state.post.content,
				title: this.state.post.title,
				author: getUser().name
			}
		})
		.then(res=>{
			console.log(res.data)
		})
	}

	render(){
		const { editorState, post } = this.state;
		return(
			<React.Fragment>
				<form onSubmit={this.onSubmit}>
					<h1 className="manage_h1">Add new post</h1>
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
							{/* <textarea
								disabled
								value={JSON.stringify(convertToRaw(editorState.getCurrentContent()))}
								// value={JSON.stringify(editorState, null, 4)}
							/> */}
							</div>
						</div>
						<div className="manage_buttons">
							<input type="submit" value="Add" className="button green" style={{width: "50%"}} />
						</div>
					</div>
				</form>
			</React.Fragment>
		)
	}
}
