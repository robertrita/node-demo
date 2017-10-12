//Dependencies
var express = require('express');
var app = express();
var port = 3000;
//pass data for firstName and lastName in the body to the server
//convert data to json
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//MongoDB, by default, runs on port 27017
//connect to the database by telling it the location of the database
//and the name of the database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/node-demo');

//Schema is the format of the data in the database
var nameSchema = new mongoose.Schema({
	firstName: String,
	lastName: String
});

//create a model from Schema
var User = mongoose.model('User', nameSchema);

//listen to requests from the browser and 
//will return the text “Hello World” back to the browser
app.get('/', (req, res) => {
	//res.send('Hello World');
	//sendFile command to show the index.html
	//node global call __dirname, provide the current directly where the command was run
	res.sendFile(__dirname + '/index.html');
});

//To save the data into the database, we need to create a new instance of our model
//pass into this instance the user’s input, then enter the command “save”
//A promise is what is returned when the save to the database completes
//successful it will return to the .then segment of the promise
//fails it will return to the .catch segment of the promise
app.post('/addname', (req, res) => {
	var myData = new User(req.body);
	myData.save()
		.then(item => {
			res.send('item saved to database');
		})
		.catch(err => {
			res.status(400).send('unable to save to database');
		});
});

//starts the server and tells it to listen on port 3000
app.listen(port, () => {
	console.log('Server listening on port ' +port);
});
