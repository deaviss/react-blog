import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Loging/Login';
import Register from './pages/Loging/Register';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import DashboardRouter from './components/Dashboard/DashboardRouter';

const Router = () =>(
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/post/:id" component={Post} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/dashboard" component={Dashboard} />
    <Route exact path="/dashboard/:component/:id" component={DashboardRouter} />
    {/* <Route exact path="/cart" component={Cart} />
    <Route exact path="/kategorie" component={Kategorie} />
    <Route exact path="/kategorie/:name" component={KategorieLista} />
    <Route exact path="/dodaj-kategorie" component={AddCategory} />
    */}
    <Route exact path="*" component={NotFound} /> 
  </Switch>
)

export default Router