import React, { Component } from 'react'
import '../../../css/Menu.css'
export default class Menu extends Component {
  render() {
      let klasa = "menu";
      if(this.props.isClosed)
        klasa = "menu closed";
    //   if(this.props)
    return (
      <div className={klasa}>
        {this.props.menuContent}
      </div>
    )
  }
}
