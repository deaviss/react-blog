import axios from 'axios'

export function getUser() {
	if(localStorage.getItem('user'))
		if(localStorage.getItem('user') != "")
			return JSON.parse(localStorage.getItem('user'))
}

export function checkToken(){
	if(getUser()){
		var user = getUser();
		axios.post('http://localhost:1332/checkToken', {
			token: user.token,
			name: user.name
		})
		.then(res => {
			if(res.data.canProceed == false){
				localStorage.setItem('user', '');
				console.log(`sesja wygasła`)
				window.location.reload();
			}
		})
	}
}