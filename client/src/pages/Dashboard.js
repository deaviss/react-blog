import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron/Jumbotron';
import { getUser } from '../user';
import '../css/Dashboard.css'
import DashboardComp from '../components/Dashboard/DashboardComp';
export default class Dashboard extends Component {

	componentWillMount() {
		if(!getUser()){
			window.location.href = '/';
		}
	}

	render() {
		return (
			<div>
				<Jumbotron
					header={"Welcome to the dashboard"}
					content={"Here you can manage your posts."}
				/>
				<DashboardComp />
			</div>
		)
	}
}
