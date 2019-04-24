import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components//Navbar/Navbar';
import Router from './Router';
import './css/Index.css';
import Footer from './components/Home/Footer';
import store from './redux/store'
import { Provider } from 'react-redux';
import { getUser, checkToken } from './user'

if(getUser()){
	checkToken();
}




const app = <Provider store={store}>
	<BrowserRouter>
		<div>
			<Navbar />
			<Router />
			<Footer />
		</div>
	</BrowserRouter>
	</Provider>

ReactDOM.render(app, document.getElementById('main'));