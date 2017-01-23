var React = require('react');

var bugfilter = class BugFilter extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 'New',
			priority: 'P1'
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.priorityChange = this.priorityChange.bind(this);
		this.statusChange = this.statusChange.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
			
		this.props.onSearch({
			status: this.state.status,
			priority: this.state.priority
		});
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
		return (<div className='bug-filter'>
            
              <select name='priority' value={this.state.priority} onChange={ this.priorityChange }>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
                <option value="P3">P3</option>
              </select>
			  <select name='status' value={this.state.status} onChange={ this.statusChange }>
                <option value="New">New</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
              </select>
			  <button type='submit' onClick={this.handleSubmit }>Search</button>
            
          </div>);
	}
}

module.exports = bugfilter;