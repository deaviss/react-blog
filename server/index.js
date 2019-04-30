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
	if(req.query.id) query.idx = req.query.id;
	if(req.query.title) query.title = req.query.title;
	if(req.query.author) query.author = req.query.author;


	var _posts =  await db.findDoc('posts')

	var rtn = _posts.filter(search(query))
	console.log(query)
	console.log(rtn)
	if(rtn.length > 0)
		res.json(rtn[0])
	else
		res.send({
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


	var usr = await db.findDocFieldsByFilter('users', {login: user.login.trim().toLowerCase()})
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
	var usr = await db.findDocFieldsByFilter('users', {login: user.login.trim().toLowerCase(), password: user.password.trim()})
	var count = usr.length
	var returnedUser = {
		canLogin: false
	}
	if(count && count > 0){
		var usr = usr[0];
		var tokens = await db.findDocFieldsByFilter('tokens', {userName: usr.login.trim().toLowerCase()})
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

app.post('/getAllUsersPosts', async(req, res) => {
	// var posts = await db.findDocFieldsByFilter('posts', {author: req.body.name})
	var posts = await db.findDocFieldsByFilter('posts', {author: req.body.name})
	res.json(posts)
})
// app.get('/testowanko', async(req,res) => {
	
// 	console.log('test')
// 	var p = {
// 		"title":"Lorem continued","createdAt":"27.4.2019 - 20:7:12","lastModified":"27.4.2019 - 20:7:12","content":{"blocks":[{"key":"cq0hp","text":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer velit ipsum, imperdiet nec odio at, venenatis viverra tortor. Morbi consectetur magna elit, et rutrum turpis dictum vitae. In sed nulla sagittis, gravida est ac, mattis velit. Suspendisse potenti. Sed congue eu lacus eu eleifend. Morbi felis dui, porta et fringilla pulvinar, pharetra in sem. Nullam sollicitudin sodales nulla. Vivamus ac condimentum magna.","type":"header-three","depth":0,"inlineStyleRanges":[{"offset":0,"length":422,"style":"color-rgb(0,0,0)"},{"offset":0,"length":422,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":422,"style":"fontfamily-Open Sans\", Arial, sans-serif"},{"offset":0,"length":316,"style":"fontsize-24"},{"offset":316,"length":106,"style":"fontsize-60"}],"entityRanges":[],"data":{"text-align":"justify"}},{"key":"9c921","text":"Etiam quis odio lobortis, interdum eros at, pellentesque odio. Aenean mollis neque id risus scelerisque, sed tincidunt risus convallis. Praesent efficitur ipsum ut sodales pretium. Suspendisse condimentum urna quis nunc sodales, quis sagittis arcu ultrices. Nullam congue pretium laoreet. Curabitur ante metus, fermentum vitae eros nec, finibus aliquam eros. Curabitur luctus tempus nibh id tincidunt. Suspendisse sed dignissim lectus. Nunc euismod nisi ac odio pellentesque, vestibulum gravida sapien pretium. Vivamus semper quam vel erat faucibus pretium. Sed efficitur odio id dignissim pharetra. Nulla volutpat aliquet enim vel aliquam. Fusce elementum auctor tempor.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":671,"style":"color-rgb(0,0,0)"},{"offset":0,"length":671,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":671,"style":"fontsize-14"},{"offset":0,"length":671,"style":"fontfamily-Open Sans\", Arial, sans-serif"}],"entityRanges":[],"data":{"text-align":"justify"}},{"key":"fksb1","text":"Etiam hendrerit feugiat elit, ac pharetra sem tempus a. Integer ut facilisis turpis. Praesent ullamcorper aliquam fringilla. Nam egestas dui vitae eros sollicitudin pulvinar. Nam ac sapien eu dui facilisis faucibus. Nullam vitae orci eget turpis maximus accumsan ac nec massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed eget convallis neque. Maecenas ut felis nisi. Vivamus nec arcu lobortis, venenatis dolor et, pretium arcu. Ut at malesuada ex. Aenean justo diam, porttitor non ligula et, porta rhoncus odio. Sed quis tincidunt dui. Nullam ultricies elit quis ligula cursus, sed fermentum orci tincidunt. Maecenas non gravida justo.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":683,"style":"color-rgb(0,0,0)"},{"offset":0,"length":683,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":683,"style":"fontsize-14"},{"offset":0,"length":683,"style":"fontfamily-Open Sans\", Arial, sans-serif"}],"entityRanges":[],"data":{"text-align":"justify"}},{"key":"76dc4","text":"Nam in orci augue. Fusce nec hendrerit odio. Proin cursus, augue id pretium egestas, tellus erat dignissim lectus, eget dignissim nulla tellus ut ante. Donec imperdiet, diam sit amet tincidunt sollicitudin, massa nisl viverra erat, vel euismod erat sapien in urna. Phasellus ultrices dignissim dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus erat ac mi tincidunt condimentum.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":437,"style":"color-rgb(0,0,0)"},{"offset":0,"length":437,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":437,"style":"fontsize-14"},{"offset":0,"length":437,"style":"fontfamily-Open Sans\", Arial, sans-serif"}],"entityRanges":[],"data":{"text-align":"justify"}},{"key":"99dq0","text":"Aenean quis ex ut ex suscipit molestie. Phasellus tortor metus, pellentesque quis convallis eget, ornare vel ligula. Nam ultrices interdum diam, vel sodales magna venenatis in. Ut viverra lorem eu urna aliquet commodo. Praesent mollis in lectus vitae dignissim. Ut varius diam ut semper tempor. Vestibulum varius blandit feugiat. Phasellus faucibus convallis leo. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":363,"style":"color-rgb(0,0,0)"},{"offset":0,"length":363,"style":"bgcolor-rgb(255,255,255)"},{"offset":0,"length":363,"style":"fontsize-14"},{"offset":0,"length":363,"style":"fontfamily-Open Sans\", Arial, sans-serif"}],"entityRanges":[],"data":{"text-align":"justify"}}],"entityMap":{}},"author":"admin"}
// 	db.insertDocumentWithIndex('posts', p);
// 	res.send('dziala')
// })

app.post('/addNewPost', async(req,res) => {
	var post = req.body.post
	if(req.body.post){
		await db.insertDocumentWithIndex('posts', {
			title: post.title,
			content: post.content,
			author: post.author,
			createdAt: Date.now(),
			lastModified: Date.now()
		})
		res.json({
			message: "Succesfully added new post!"
		})
	}
	res.json({
		message: "Something went wrong..."
	})
})

app.post('/getPostToEdit', async function(req,res){
	var query = req.body;
	var rtn = await db.findDocFieldsByFilter('posts',{idx: parseInt(query.idx), author: query.author});
	console.log(query)
	console.log(rtn)
	if(rtn.length === 1)
		res.json(rtn[0])
	else
		res.send({
			message: 'This is an error!'
		});

}); 

app.post('/editPost', async(req,res) => {
	var editedPost = req.body.post;
	delete editedPost['_id']
	console.log(editedPost)
	var foundPost = await db.findDocFieldsByFilter('posts', {author: editedPost.author, idx: parseInt(editedPost.idx)})
	// if there's a post, proceed
	if(foundPost.length === 1){ 
		await db.findOneAndUpdate('posts', {author: editedPost.author, idx: editedPost.idx}, editedPost);
		res.json({
			message: 'Succesfully edited post.'
		})
	}else {
		res.json({
			message: 'There is something wrong...'
		})
	}
})
 
app.post('/deletePost', async(req,res) => {
	var delPost = req.body.post;
	var foundPost = await db.findDocFieldsByFilter('posts', {author: editedPost.author, id: editedPost.id})
	if(foundPost.length === 1){
		await db.removeDocByFilter('posts', {author: editedPost.author, id: editedPost.id});
		res.json({
			message: 'Succesfully removed post.'
		})
	}else {
		res.json({
			message: 'There is something wrong...'
		})
	}
})
server.listen(_PORT);
console.log(`Serwer ruszyl: http://localhost:${_PORT}`);
