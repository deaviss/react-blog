import React, { Component } from 'react'
import '../../css/HamburgerButton.css'
export default class HamburgerButton extends Component {
  render() {
    return (
      <button className="hamburger" onClick={this.props.click}>
        <div></div>
        <div></div>
        <div></div>
      </button>
    )
  }
}
