var d = new Date();
var dzien = d.getDate();
var miesiac = d.getMonth() + 1
var rok = d.getFullYear()
var time = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
var data = `${dzien}.${miesiac}.${rok} - ${time}`;
const posts = [
	{
		id: 0,
		title: 'Example post 0',
		createdAt: data,
		lastModified: data,
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum aliquam enim vitae pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nisl ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in orci non libero pellentesque accumsan. Phasellus pellentesque ligula in nulla malesuada, eu pulvinar diam rhoncus. Nam fringilla posuere lectus sed faucibus.',
		shortContent: '',
		author: 'Admin'
	},
	{
		id: 1,
		title: 'Example post 1',
		createdAt: data,
		lastModified: data,
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum aliquam enim vitae pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nisl ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in orci non libero pellentesque accumsan. Phasellus pellentesque ligula in nulla malesuada, eu pulvinar diam rhoncus. Nam fringilla posuere lectus sed faucibus.',
		shortContent: '',
		author: 'Admin'
	},
	{
		id: 2,
		title: 'Example post 2',
		createdAt: data,
		lastModified: data,
		content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum aliquam enim vitae pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis nisl ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in orci non libero pellentesque accumsan. Phasellus pellentesque ligula in nulla malesuada, eu pulvinar diam rhoncus. Nam fringilla posuere lectus sed faucibus.',
		shortContent: '',
		author: 'Admin'
	},
	
]

export default posts;