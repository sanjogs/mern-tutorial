var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var browserHistory = require('react-router').browserHistory;

var BugList = require('./buglist.js');

var NoMatch = React.createClass({
	render: function() {
		return (
			<h2>Resource not found</h2>
			);
	}
});

ReactDOM.render((
	<Router history={ browserHistory }>
 	  <Route path="/bugs" component={ BugList } />
 	  <Redirect from="/" to="/bugs" />
 	  <Route path='*' component={ NoMatch } />
 	</Router>
	),
	document.getElementById('main'));
