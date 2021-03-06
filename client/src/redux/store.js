import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers/index'
import { fetchPosts } from './actions/post-actions'



const initialState = {};

const middleware = [thunk]

const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store;