import React, { Component } from 'react'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html';
import { convertToHTML } from 'draft-convert';
import renderHTML from 'react-render-html';

import '../../css/Posts.css'
import '../../css/react-draft-wysiwyg.css'

export default class PostList extends Component {
	render() {
		const {post} = this.props;
		var content = EditorState.createWithContent(convertFromRaw(post.content))
		var rawContent = draftToHtml(convertToRaw(content.getCurrentContent()));
		console.log(content);
		// var shortContent = post.content.split(' ');
		var shortContent = 'asd'
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
					<Editor
						editorState={content}
						wrapperClassName="demo-wrapper"
						editorClassName="demo-editor"
						toolbarHidden
						readOnly={true}
					/>
				</div>
				<div className="post_button_container">
					<a href={`/post/${post.idx}`}>
						<span className="post_button">Read more</span>
					</a>
				</div>
			</div>
		)
	}
}
