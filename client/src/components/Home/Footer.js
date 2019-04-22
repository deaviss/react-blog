import React, { Component } from 'react'
import '../../css/sections.css';
import Post from '../Post/Post';
export default class Footer extends Component {
	render() {
		var date = new Date();
		return (
			<section className="sections section_b">
				<footer style={{textAlign: "center", fontSize: "3vh"}}>
					Copyright {date.getFullYear()}
				</footer>
			</section>
		)
	}
}
