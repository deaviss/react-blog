import React, { Component } from 'react'
import '../../../css/Wygaszacz.css';
export default class Wygaszacz extends Component {
  render() {
    let klasa = "wygaszacz"
    if(this.props.isClosed)
      klasa="wygaszacz closed"
    return (
      <div className={klasa} onClick={this.props.click}></div>
    )
  }
}
