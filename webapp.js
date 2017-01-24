var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var app = express();
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

mongoose.connect('mongodb://127.0.0.1:27017/bugtracker');
mongoose.Promise = global.Promise;

var Bug = require('./model/bugtracker.js');

app.route('/api/bugs')
	.get((req, res) => {
		//construct query filters
		var filter = {};
		console.log(req.query)
		if (req.query.status) {
			filter.status = req.query.status;
		}
		if (req.query.priority) {
			filter.priority = req.query.priority;
		}
		//find bugs list
		Bug.find(filter, function(err, bugdata) {
			if (err) res.status(500).send('cannot fetch bugs from db');

			res.json(bugdata);
		});
	})
	.post((req, res) => {

		Bug.count({}, function(err, c) {
			var bug = new Bug();

			var newid = c + 1;

			bug.id = newid;
			bug.status = req.body.status;
			bug.priority = req.body.priority;
			bug.owner = req.body.owner;
			bug.title = req.body.title;

			bug.save((err, doc) => {
				if (err) res.status(500).send('cannot save bug to db');
				res.json(doc);
			});
		});
	});
app.route('/api/bugs/:id')
	.get((req, res) => {
		Bug.findOne({
			id: req.params.id
		}, (err, doc) => {
			if (err) res.status(500).send('something went wrong while trying to fetch data');

			if (doc) {
				res.json(doc);
			}
		});
	})
	.put((req, res) => {
		Bug.update({
			id: req.params.id
		}, req.body.bug, function(err, doc) {
			if (err) res.status(500).send('something went wrong while updating');

			if (doc) {
				res.json(doc);
			}
		});

	});

//redirect every other request to client app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'static', 'index.html'));
});

app.listen(3000, () => {
	console.log('listening at 3000');
});