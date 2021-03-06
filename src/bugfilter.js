var React = require('react');
var Button = require('react-bootstrap/lib/Button');
var Panel  = require('react-bootstrap/lib/Panel');
var Col  = require('react-bootstrap/lib/Col');
var Row  = require('react-bootstrap/lib/Row');
var ControlLabel  = require('react-bootstrap/lib/ControlLabel');
var FormControl  = require('react-bootstrap/lib/FormControl');

var bugfilter = class BugFilter extends React.Component {
	constructor(props) {
		super(props);
		var initFilter = this.props.initFilter;
		this.state = {
			status: initFilter.status,
			priority: initFilter.priority
		};
		console.log('setting initial state on constructor, filter');
		this.handleSubmit = this.handleSubmit.bind(this);
		this.priorityChange = this.priorityChange.bind(this);
		this.statusChange = this.statusChange.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		if (nextProps.initFilter.status==this.state.status && nextProps.initFilter.priority==this.state.priority)
		{
			console.log('no changes on componentWillReceiveProps');
			return;
		}
		this.setState({
			status: nextProps.initFilter.status,
			priority: nextProps.initFilter.priority
		});
		console.log('refreshing state, on componentWillReceiveProps');
		
	}

	handleSubmit(e) {
		e.preventDefault();
		var filter = {};
		if (this.state.status)
			filter.status = this.state.status;
		if (this.state.priority)
			filter.priority = this.state.priority;

		this.props.onSearch(filter);
	}
	priorityChange(evt) {
		this.setState({
			'priority': evt.target.value
		});
	}
	statusChange(evt) {
		this.setState({
			'status': evt.target.value
		});
	}
	render() {
		return (
			<Panel header="Filter" className='bug-filter'>
				<Row>
					<Col sm={6} md={4}>
					    <ControlLabel>Priority</ControlLabel>
						<FormControl name="priority" componentClass="select" placeholder="select" value={this.state.priority} onChange={this.priorityChange}>
							<option value="P1">P1</option>
							<option value="P2">P2</option>
							<option value="P3">P3</option>
						</FormControl>
					</Col>
					<Col sm={6} md={4}>
						<ControlLabel>Priority</ControlLabel>
						<FormControl name="status" componentClass="select" placeholder="select"  value={ this.state.status } onChange={ this.statusChange }>
							<option value="New">New</option>
							<option value="Open">Open</option>
							<option value="Closed">Closed</option>
						</FormControl>
					</Col>
					<Col sm={6} md={4}>
					
						<Button bsStyle="primary" onClick={ this.handleSubmit }>Search</Button>
					</Col>
				</Row>
          </Panel>
		  );
	}
}

module.exports = bugfilter;