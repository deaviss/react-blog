import React, { Component } from 'react'
import { getUser, checkToken } from '../../../user';
import axios from 'axios'
import PostManager from './PostManager';

export default class Manage extends Component {

	state = {
		posts: [],
		filter: '',
		filteredPosts: [],
		selectedPost: undefined
	}

	componentDidMount(){
		checkToken();
		console.log('fetching posts for ' + getUser().name)
		axios.post('http://localhost:1332' + '/getAllUsersPosts', {
			name: getUser().name.toLowerCase()
		})
		.then(res => {
			this.setState({posts: res.data, filteredPosts: res.data})
		})
	}

	onChange = e => {

		var updatedPosts = this.state.posts;
		updatedPosts = updatedPosts.filter(
		function(p){
			return p.title.toLowerCase().search(
				e.target.value.toLowerCase()) !== -1;
		});
		this.setState({...this.state, filteredPosts: updatedPosts},()=>console.log(this.state.filteredPosts))

	}

	changeSelected = (id) => {
		this.setState({...this.state, selectedPost: id})
	}

	render() {
		if(this.state.selectedPost){
			return (
				<React.Fragment>
					<i onClick={() => {this.setState({...this.state, selectedPost: undefined})}} className="fas fa-arrow-left" style={{cursor: "pointer", fontSize: "3vh"}}></i>
					<PostManager id={this.state.selectedPost} />
				</React.Fragment>
			)
		} else {
			return (
				<div className="manage">
					<h1>Here you can manage all of your existing posts.</h1>
					<input type='text' placeholder="Filter by title" onChange={this.onChange} />
					<br />
					{this.state.filteredPosts.map((post, i) => (
						<Listed post={post} func={this.changeSelected} key={i}  />
					))}
				</div>
			)
		}
	}
}

class Listed extends Component{
	state = {
		clicked: false
	}

	handleClick = (e) => {
		if(e.target.classList.length === 1)
			e.target.classList.add('active')
		else 
			e.target.classList.remove('active')

	}

	

	render(){
		var { post, func } = this.props;
		return (
			// <div className={"manage_post "} onClick={this.handleClick}>
			<div onClick={() => this.props.func(post.idx)} className={"manage_post "} >
				{post.title}
			</div>
		)
	}
}
