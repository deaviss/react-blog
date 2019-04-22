export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const NEW_POST = 'NEW_POST';

export const fetchPosts = () => dispatch => {
	console.log('fetching')
		fetch('http://localhost:1332/getAllPosts')
		.then(res => res.json() )
		.then(res => dispatch({
			type: FETCH_POSTS,
			payload: res
		}))
		.catch(res => console.log(res))
}

export const fetchPost = (id) => dispatch => {
	console.log('fetching')
	fetch(`http://localhost:1332/getPost/?id=${id}`)
		.then(res => res.json() )
		.then(res => dispatch({
			type: FETCH_POST,
			payload: {
				post: res,
				loading: false
			}
		}))
		.catch(res => console.log(res))
}