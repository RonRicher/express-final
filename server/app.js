const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const port = 8000;
// var cors = require('cors');
const fs = require('fs');
const { log } = require('console');
const { json } = require('express');
// app.use(cors())

// let fakeDB = {
// 	flavors: [
// 		{ name: "vanilla", amount: 2 },
// 		{ name: "chocolate", amount: 5 },
// 		{ name: "strawberry", amount: 1 },
// 		{ name: "mint", amount: 8 },
// 	],
// 	customers: [{
// 		id: 1,
// 		name: 'John',
// 		favoriteFlavor: 'vanilla'
// 	}, {
// 		id: 2,
// 		name: 'Jane',
// 		favoriteFlavor: 'chocolate'
// 	}, {
// 		id: 3,
// 		name: 'Bob',
// 		favoriteFlavor: 'strawberry'
// 	}]
// }

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next()
});

app.use(bodyParser.json())
app.get('/', (req, res) => {
	res.send({ data: 'your server is working (;' })
});


// get all flavors from the fakeDB
app.get('/drive/:fileName', (req, res) => {
	const {params} = req;

	console.log(params);
	fs.readFile(`../../fakeDB/${params.fileName}`, 'utf8', (error, data) => {
		if(error){
			console.log('serverError:', error);
		}
		try{
			console.log(data.toString())
			res.json(data)
		
		}
		catch(error){
			console.log(error);
		}
	})
	// res.json(toGive) //use res.json to return res as json
});

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