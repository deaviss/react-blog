import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home';
import Post from './pages/Post';
import Login from './pages/Loging/Login';
import Register from './pages/Loging/Register';

const Router = () =>(
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/post/:id" component={Post} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
    {/* <Route exact path="/cart" component={Cart} />
    <Route exact path="/kategorie" component={Kategorie} />
    <Route exact path="/kategorie/:name" component={KategorieLista} />
    <Route exact path="/dodaj-kategorie" component={AddCategory} />

    <Route exact path="*" component={NotFound} /> */}
  </Switch>
)

export default Router