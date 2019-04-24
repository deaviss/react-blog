var express = require('express');
var app = express();
var server = require('http').Server(app);
const bodyParser = require('body-parser');
const mongoD = require('./mongo_db')
const db = new mongoD.mongoDbClient();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var _PORT = 1332;

var d = new Date();
var dzien = d.getDate();
var miesiac = d.getMonth() + 1
var rok = d.getFullYear()
var time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
var data = `${dzien}.${miesiac}.${rok} - ${time}`;

function search(query) {
  return function(element) {
    for(var i in query) {
      if(query[i] != element[i]) {
        return false;
      }
    }
    return true;
  }
}

// async function connect(){
// 	MongoClient.connect('mongodb://localhost:27017/blog',{ useNewUrlParser: true }, function (err, client) {
// 		if (err) throw err
// 		var db = client.db('blog')
// 		db.collection('posts').find().toArray(function (err, result) {
// 			if (err) throw err

// 			console.log(result)
// 		})
// 	})
// }
// connect();

async function conn(onConn,onErr){
	await db.connect({url: "mongodb://localhost:27017/blog"}, onConn, onErr);
}
conn(()=>console.log('polaczono'), () => console.log('err'));

app.use(function (req, res, next) {

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

app.get('/getAllPosts',async function(req,res){
	res.json( await db.findDoc('posts'))
}); 
app.get('/getPost', async function(req,res){
	/*
			Custom search by queries. Eg:
			/getPost/?id=0
			/getPost/?title=Example post 2
			/getPost/?author=Admin
			/getPost/?author=Admin&title=Example post 2&id=2
	*/
	var query = {};
	if(req.query.id) query.id = req.query.id;
	if(req.query.title) query.title = req.query.title;
	if(req.query.author) query.author = req.query.author;


	var _posts =  await db.findDoc('posts')

	var rtn = _posts.filter(search(query))
	if(rtn.length > 0)
		res.json(rtn[0])
	else
		res.status(400).send({
			message: 'This is an error!'
		});

}); 
app.get('/getComments', async function(req,res){

	var query = {};
	if(req.query.id) query.postId = req.query.id;
	var _comments = await db.findDoc('comments')

	var rtn = _comments.filter(search(query))
	if(rtn.length > 0)
		res.json(rtn)
	else
		res.send([]);
}); 

app.post('/addComment', async (req,res) => {
	var comment = req.body;
	console.log(comment)
	if(comment.nick < 3){
		res.json({message: "Nick is too short!"})
		return false;
	}
	if(comment.content < 20){
		res.json({message: "Comment is too short!"})
		return false;
	}

	
	var coment = await db.findDocFieldsByFilter('comments', {nick: comment.nick, content: comment.content, postId: comment.postId})
	var count = coment.length
	if(count && count > 0){
		res.json({message: `This comment already exists!`})
	} else {
		db.insertDocumentWithIndex('comments', comment)
		console.log(`Comment succesfully added`)
		res.json({message: `Comment succesfully added`});
	}
})

app.post('/register', async (req,res) => {
	var user = req.body;
	console.log(user)
	if(user.login.length < 3){
		res.json({message: "Login is too short!"})
		return false;
	}
	if(user.password.length < 3){
		res.json({message: "Password is too short!"})
		return false;
	}


	var usr = await db.findDocFieldsByFilter('users', {login: user.login})
	var count = usr.length
	if(count && count > 0){
		res.json({message: `User ${user.login} already exists!`})
	} else {
		db.insertDocumentWithIndex('users', user)
		console.log(`Account ${user.login} has been created!`)
		res.json({message: `Succesfully created user ${user.login}`});
	} 
})
app.post('/login', async (req,res) => {
	var user = req.body;
	console.log(user)
	if(user.login.length < 3){
		res.json({message: "Login is too short!"})
		return false;
	}
	if(user.password.length < 3){
		res.json({message: "Password is too short!"})
		return false;
	}
	var usr = await db.findDocFieldsByFilter('users', {login: user.login, password: user.password})
	var count = usr.length
	var returnedUser = {
		canLogin: false
	}
	if(count && count > 0){
		var usr = usr[0];
		var tokens = await db.findDocFieldsByFilter('tokens', {userName: usr.login})
		var token = undefined;
		var ttl = 120000
		
		tokens.forEach(t=>{
			var date1 = new Date(t.created / 1000 + ttl) / 1;
			var date = new Date().getTime() / 1000;
			if(date1 >= date) {
				token = t.tokenId;
			}
		})
		if(!token){
			var randomLetters = 'abcdefghijklmnopqrstyzv0123456789';
			var newToken = "";
			while(newToken.length < 13){
				newToken += randomLetters[Math.floor(Math.random() * randomLetters.length)]
			}
			token = newToken;
			db.insertDocumentWithIndex('tokens', {
				userName: usr.login,
				created: Date.now(),
				tokenId: token
			})
		}
		returnedUser = {
			token: token,
			name: usr.login
		}
		console.log(`Account ${user.login} has logged in!`)
		res.json({message: `Succesfully logged in as ${user.login}`, user: returnedUser});
	} else {
		res.json({message: `User ${user.login} does not exists!`, user: returnedUser})
	}
})

app.post('/checkToken', async (req,res) => {
	var token = await db.findDocFieldsByFilter('tokens', {tokenId: req.body.token, userName: req.body.name})
	token = token[0];
	if(token){
		res.json({
			canProceed: true
		})
	}
	else {
		res.json({
			canProceed: false
		})
	}
});

server.listen(_PORT);
console.log(`Serwer ruszyl: http://localhost:${_PORT}`);
