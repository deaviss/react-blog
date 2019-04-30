import React, { Component } from 'react'
import Overview from './components/Overview';
import { getUser } from '../../user'
import Manage from './components/Manage';
import AddNewPost from './components/AddNewPost';

export default class DashboardComp extends Component {


	state = {
		activatedClass: 'manage'
	}

	changeClass = (e) => {
		//e.target.className = "dashboard_panel_activated";
		this.setState({activatedClass: e.target.id}, () => {
			var aC = this.state.activatedClass;
			for(var prop in this.refs){
				if(this.refs[prop].id == aC){
					this.refs[prop].className = "dashboard_panel_activated";
					// view this panel on the right side
				}
				else 
					this.refs[prop].className = "";
				
			}
			
		})
		
	}

	showComponent = (
		// classes: overview, profile, manage
		{}
	)

	

	render() {
		return (
			<section className="dashboard">
				<div className="dashboard_left">
					<header className="dashboard_header">
						<span><strong>{getUser().name.toUpperCase()}</strong> dashboard</span>
					</header>
					<div className="dashboard_panel">
						<ul>
							<li ref="a" onClick={this.changeClass} id="overview">
								Overview
							</li>
							<li ref="b" onClick={this.changeClass} id="addPost">
								Add new post
							</li>
							<li ref="c" className="dashboard_panel_activated" onClick={this.changeClass} id="manage">
								Manage posts
							</li>
						</ul>
					</div>
				</div>
				<div className="dashboard_right">
					<Orang id={this.state.activatedClass} />
				</div>
			</section>
		)
	}
}


function Orang(state) {
	switch(state.id){
		case 'overview':
			return <Overview />
		case 'addPost':
			return <AddNewPost />
		case 'manage':
			return <Manage />
		default:
			return <div>x</div>
	}
}