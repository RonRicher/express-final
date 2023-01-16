const express = require('express')
const bodyParser = require('body-parser')
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

let fakeDB = {
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
}

let files = ['ggg.txt', 'dfsf.txt', 'hello']

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(`Access-Control-Allow-Methods`, `*`);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next()
});

app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.send({ data: 'your server is working (;' })
});


app.get('/drive/getFiles', (req, res) => {
	try {
		res.json(files)
	}
	catch (error) {
		console.log(error);
	}
})



app.get('/drive/info/:fileName', (req, res) => {
	const { params } = req;

	console.log(params);
	fs.stat(`../server/fakeDB/${params.fileName}`, 'utf8', (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}
		try {
			res.json(data)
		}
		catch (error) {
			console.log(error);
		}
	})
});

app.get('/drive/show/:fileName', (req, res) => {
	const { params } = req;

	console.log(params);
	fs.readFile(`../server/fakeDB/${params.fileName}`, 'utf8', (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}
		try {
			res.json(data)
		}
		catch (error) {
			console.log(error);
		}
	})
});

app.put('/drive/rename', (req, res) => {
	// console.log(req.query.name)
	// console.log(req.query.newName)
	fs.rename(`../server/fakeDB/${req.query.name}`, `../server/fakeDB/${req.query.newName}`, (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}

		console.log('file renamed')
	})
});

app.put('/drive/copyFile', (req, res) => {
	console.log(req.query.name)
	console.log(req.query.newName)
	fs.copy(`../server/fakeDB/${req.query.name}`, `../server/fakeDB/${req.query.newName}`, (error, data) => {
		if (error) {
			console.log('serverError:', error);
		}

		console.log('file renamed')
	})
});

app.post('/drive/copyFile', (req, res) => {
	fs.copyFile(`../server/fakeDB/${req.query.param1}`,
		`../server/fakeDB/${req.query.param2}/${req.query.param1}`, (error, data) => {
			if (error) {
				console.log('serverError:', error);
			}

			console.log('file renamed')
		})


});

app.get(`/users/:username/:password`, (req, res) => {
	const { params, body } = req;
	console.log(params);
	const user = fakeDB.users.find
		(user => user.name === params.username && user.password === params.password);
	if (user) {
		console.log('yayyyy')
		res.json(user)
	}
	else {
		res.json('what')
	}
})


app.post(`/users/signup/:username/:password`, (req, res) => {
	const {params} = req;
	console.log(params);
	const user = fakeDB.users.find
	(user => user.name === params.username);
	if(!user){
		console.log('yayyyy')
		fakeDB.users.push({
			id: fakeDB.users.length,
			name: params.username,
			password: params.password
		})
		res.json([])
		console.log('server empty')
	}
	else{
		res.json('what')
		console.log('server not empty')
	}
})


app.post('/drive/moveFile', (req, res, next) => {
	console.log('query:', req.query)
	console.log("lllllllllll")
	// console.log(req.query.param1)
	console.log(req.query.param2)
	fs.rename(`../server/fakeDB/${req.query.param1}`,
		`../server/fakeDB/${req.query.param2}/${req.query.param1}`,
		(err) => {
			if (err) {
				console.log(`err: `, err);
			}
		}
	);
	console.log("moved File successfully.");
	res.json('success to move')
})

app.delete('/drive/:deleteFile', (req, res, next) => {
	const { params } = req;
	const deleteFile = params.deleteFile;
	console.log(deleteFile)
	fs.rm(`./fakeDB/${deleteFile}`, (err) => {
		if (err) {
			console.log(err);
		}
		console.log("Delete File successfully.");
		res.json('success to delete')
	});

})

// //customers API
// app.get('/api/customers/:id', (req, res) => {
// 	const customer = fakeDB.customers.find(
// 		customer => customer.id === Number(req.params.id) 
// 	)
// 	res.json(customer)
// 	//First Mission: return to client customer from FakeDB - specified by param

// })

// app.put('/api/flavors/:name', (req, res, next) => {
// 	const {body, params} = req
// 	const flavor = fakeDB.flavors.find(
// 		flavor => flavor.name === params.name 
// 	)
// 	console.log(flavor);
// 	const amountCheck = flavor.amount - body.amount;
// 	amountCheck >= 0? flavor.amount = amountCheck : 
// 	res.json(fakeDB.flavors)

// //! Second Mission - (PUT) create a route that handles buying ice cream flavor by name from req.params, 
// //!recive flavor from params and amount from body

// })

// app.post('/api/flavors/:name', (req, res, next) => {
// 	const {body, params} = req
// 	console.log("req", body, params);
// 	fakeDB.flavors= [...fakeDB.flavors, body]
// 	res.json(fakeDB.flavors)

// })

// app.get(`/api/flavors`, (req, res, next) => {
// 	const {query} = req.query;
// 	const Filteredflavors = fakeDB.flavors.filter(flavor => req.query.amount <= flavor.amount);
// 	res.json(Filteredflavors)
// } )

// //!Fourth Mission (Get) in the existing route "/api/flavor" add a query of amount. 
// //!If amount is given, return only the flavors that has at least that amount

// //! Extra Mission - (Delete) create a route that handle deleting flavor from the fakeDB.flavors through req.params

// app.delete('/api/flavors/:name', (req, res, next) => {
// 	const {params} = req
// 	console.log("req", params);
// 	const remainFlavors = fakeDB.flavors.filter(
// 		flavor => flavor.name !== params.name 
// 	)
// 	fakeDB.flavors = remainFlavors;
// 	res.json(fakeDB.flavors)

// })


app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`)
});