import React, { Component } from 'react'
import '../../css/Navbar.css';
import HamburgerButton from './HamburgerButton';
import Wygaszacz from './Wygaszacz/Wygaszacz';
import Menu from './Wygaszacz/Menu';
import { getUser, checkToken } from '../../user'
export default class Navbar extends Component {

	state = {
    isMenuClosed: true
  }

  menuContent = (
    <ul>
      <li><a href="/">Contact</a></li>
      {getUser() && <li><a href="/dashboard">Dashboard</a></li>}
      <li><a href="/">About</a></li>
    </ul>
  )

  
  componentDidMount() {
    window.onscroll = this.handleScroll;
  }

  handleScroll = () => { 
    var toolbar = document.getElementById("toolbar");
    if (document.body.scrollTop > 5 || document.documentElement.scrollTop > 5) {
      // when you scroll down
      toolbar.classList.remove('non_scrolled')
      toolbar.classList.add('scrolled')
    } else {
      // when there's no scrolling
      toolbar.classList.add('non_scrolled')
      toolbar.classList.remove('scrolled')
    }
  }

  toggleMenu = () => {
    this.setState((prevstate) => {
      return {isMenuClosed: !prevstate.isMenuClosed}
    })
  }
  closeMenu = () =>{
    this.setState({isMenuClosed: true})
  }
  
  
	
	render() {
		return (
			<div id="toolbar" className="toolbar">
        <HamburgerButton click={this.toggleMenu}/> 
        <Wygaszacz click={this.closeMenu} isClosed={this.state.isMenuClosed} />
        <Menu isClosed={this.state.isMenuClosed} menuContent={this.menuContent}/>
        <span className="logo"><a href="/">BLOG</a></span>
        {getUser() && <span>Zalogowano jako {getUser().name}</span>}
        <div className="links">
          {this.menuContent}
        </div>
      </div>
		)
	}
}


