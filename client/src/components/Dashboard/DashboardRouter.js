import React, { Component } from 'react'
import Jumbotron from '../Jumbotron/Jumbotron';
import PostManager from './components/PostManager';

export default class DashboardRouter extends Component {

	state = {
		component: this.props.match.params.component,
		id: this.props.match.params.id
	}

	

	switcher() {
		switch(this.state.component){
			case 'manage':
				return <PostManager id={this.state.id} />
			default: return(<div>Error</div>)
		}
	}


	render() {
		var {params} = this.props.match
		return (
			<div>
				<Jumbotron 
					header={params.component}
					content={params.id}
				/>
				<div className="sections section_a">
					{/* there will be 2 panels.
							the first one is responsible for editing existing post
							the second one is responsible for showing how the post will look */}
					{this.switcher()}
				</div>
			</div>
		)
	}
}