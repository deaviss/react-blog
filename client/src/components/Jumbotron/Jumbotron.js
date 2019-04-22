import React, { Component } from 'react'
import '../../css/Jumbotron.css'
export default class Jumbotron extends Component {
	render() {
		return (
			<div className="jumbotron">
				<div className="vertical-center">
					<div className="jumbotron_header">
						{this.props.header && <h1>{this.props.header}</h1>}
					</div>
					<div className="jumbotron_content">
						{this.props.content && <h3>{this.props.content}</h3>}
					</div>
				</div>
			</div>
		)
	}
}
