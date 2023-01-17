const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
// var cors = require('cors');
const fs = require('fs');
const { dirname } = require('path');
const path = require('path');
const { log } = require('console');
const { json, query } = require('express');

// app.options('*', (req, res) => {
// 	res.status(200).send('fddfdf');
// });

// app.use(cors({origin: "*"}))

let usersDB = {
	users: [{
		id: 1,
		name: 'John',
		password: '12345678'
	}, {
		id: 2,
		name: 'Jane',
		password: '87654321'
	}, {
		id: 3,
		name: 'Bob',
		password: '13572468'
	}]
};

const files = [
	{
		name: 'ggg.txt',
		isFolder: false,
		path: '/'
	},
	{
		name: 'hello',
		isFolder: true,
		path: '/'
	},
	{
		name: 'iii.txt',
		isFolder: false,
		path: '/hello/'
	}
];

let fakeDB = [{
	id: 1,
	name: 'John',
	files: ['ggg.txt', 'dfsf.txt',
		{
			folderName: 'hello', files: ['iii.txt', 'bbb.txt', 'ccc.txt',
				{
					folderName: 'Joalin', files: ['aaa.txt', 'lll.txt',
						{ folderName: 'amit', files: ['rrr.txt', 'asdd.txt'] }],
				}]
		}]
},
{
	id: 2,
	name: 'Bret',
	files: ['ggg.txt', 'dfsf.txt', { folderName: 'hello', files: ['iii.txt', 'bbb.txt', 'ccc.txt', 'folder'] }]
}
];

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(`Access-Control-Allow-Methods`, `*`);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(bodyParser.json());
app.get('/', (req, res) => {
	res.send({ data: 'your server is working (;' });
});


app.get('/drive/getFiles/:userName', (req, res) => {
	const currentUserName = req.params.userName;
	console.log('server:', currentUserName);


	try {
		for (user of fakeDB) {
			console.log('for', user);
			if (user.name === currentUserName) {
				res.json(user.files);
			}
		}
	}
	catch (error) {
		console.log(error);
	}
});


app.get('/drive/getFiles/:userName/*', (req, res) => {
	const currentUserName = req.params.userName;
	let currentFolderName = req.url.split('/');
	currentFolderName = currentFolderName.splice(4);
	console.log('current: ', currentFolderName);



	try {
		for (user of fakeDB) {
			if (user.name === currentUserName) {
				let a = user.files;
				for (index in currentFolderName) {
					for (i in a) {
						if (typeof a[i] === 'object') {
							if (a[i].folderName === currentFolderName[index]) {
								a = a[i].files;
							}
						}
					}
				}
				res.send(a || []);
			}
		}
	}
	catch (error) {
		console.log(error);
	}
});



app.get('/drive/info/*', (req, res) => {
	const { params } = req;

	fs.stat(`../server/fakeDB/${params[0]}`, 'utf8', (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}
		try {
			res.json(data);
		}
		catch (error) {
			console.log(error);
		}
	});
});


app.get('/drive/show/*', (req, res) => {
	const { params } = req;

	console.log(params);
	fs.readFile(`../server/fakeDB/${params[0]}`, 'utf8', (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}
		try {
			res.json(data);
		}
		catch (error) {
			console.log(error);
		}
	});
});

app.put('/drive/rename', (req, res) => {
	fs.rename(`../server/fakeDB/${req.query.name}`, `../server/fakeDB/${req.query.newName}`, (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}

		console.log('file renamed');
	});
});

app.put('/drive/copyFile', (req, res) => {
	console.log(req.query.name);
	console.log(req.query.newName);
	fs.copyFile(`../server/fakeDB/*/${req.query.name}`, `../server/fakeDB/${req.query.newName}/${req.query.name}`, (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}

		console.log('file renamed');
	});
});

app.get(`/users/:username/:password`, (req, res) => {
	const { params, body } = req;
	console.log(params);
	const user = usersDB.users.find
		(user => user.name === params.username && user.password === params.password);
	if (user) {
		console.log('yayyyy');
		res.json(user);
	}
	else {
		res.json('what');
	}
});


app.post(`/users/signup/:username/:password`, (req, res) => {
	const { params } = req;
	console.log(params);
	const user = usersDB.users.find;
	(user => user.name === params.username);
	if (user) {
		usersDB.users.push({
			id: usersDB.users.length,
			name: params.username,
			password: params.password
		});
		fs.mkdir(`./fakeDB/allUserFiles/${params.username}`, (error) => {
			if (error) {
				console.log(error);
			}
		});
		res.send([]);
		console.log('empty');
	}
	else {
		res.json('what');
		console.log('not empty');
	}
});


app.post('/drive/moveFile', (req, res, next) => {
	fs.rename(`../server/fakeDB/${req.query.source}`,
		`../server/fakeDB/${req.query.destination}/${req.query.source}`,
		(err) => {
			if (err) {
				console.log(`err: `, err);
			}
		}
	);
	console.log("moved File successfully.");
	res.json('success to move');
});

app.delete('/drive/:deleteFile', (req, res, next) => {
	const { params } = req;
	const deleteFile = params.deleteFile;
	console.log(deleteFile);
	fs.rm(`./fakeDB/${deleteFile}`, (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Delete File successfully.");
		res.json('success to delete');
	});

});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});