# React blog
This is a simple blog written in React.js.  
Each post has it's own comment section, where people can post their comments.  

## Installing
To install this project, you need to have mongodb.  
In mongodb create new database called 'blog'  
In blog database create collections: 'posts', 'comments'  

After you are done with mongodb, you can proceed to run this procject.  
Firstly you need to run the './server/index.js' using node/nodemon.  
Then go to './client/' and run 'npm run dev' to run react client via parcel.  

## Done
1) Receiving all posts from database  
2) Receiving specific post from database  
3) Receiving all comments from specific post  
4) Posting new comments to specific post  
5) Logging (a simple version)  

## To-do
1) Dashboard where an admin can add new post or modify existing posts (posts at the moment are hard-coded in the database)  
2) Better styling. Almost everything is now scaleable with 'vh' so the page looks the same as you zoom in/out  
3) Post rating from 1 to 5  
4) Comment rating (this does exist, but it's hard-coded)