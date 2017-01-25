var React = require("react");
var $ = require("jquery");
var Link=require('react-router').Link;

var bugedit = class BugEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.titleChange=this.titleChange.bind(this);
        this.priorityChange=this.priorityChange.bind(this);
        this.ownerChange=this.ownerChange.bind(this);
        this.statusChange=this.statusChange.bind(this);
        this.submit=this.submit.bind(this);
    }

    componentDidMount() {
        $.get('/api/bugs/' + this.props.params.id, function(data) {

            this.setState(data);
        }.bind(this));


    }
    titleChange(e) {
        this.setState({title: e.target.value});
    }
    ownerChange(e) {
        this.setState({owner : e.target.value});
    }
    priorityChange(e) {
        this.setState({priority : e.target.value});
    }
    statusChange(e) {
        this.setState({status: e.target.value});
    }
    submit(e) {
        e.preventDefault();
        var bug = {
            status: this.state.status,
            priority: this.state.priority,
            owner: this.state.owner,
            title: this.state.title
        }
        $.ajax({
            url: '/api/bugs/' + this.props.params.id,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(bug),
            dataType: 'json',
            success: function(bug) {
                this.setState(bug);
            }.bind(this),
        });
    }
    render() {
        return (<div>
                  <form name="bugedit" onSubmit={ this.submit }>
                  Title:
                    <input type='text' name='title' value={ this.state.title } onChange={ this.titleChange } placeholder='bug title' />
                   <br/>
                   Owner:
                    <input type='text' name='owner' value={ this.state.owner } onChange={ this.ownerChange } placeholder='owner' />
                 <br/>
                   Priority:
                    <select name='priority' value={ this.state.priority } onChange={ this.priorityChange }>
                      <option value="P1">P1</option>
                      <option value="P2">P2</option>
                      <option value="P3">P3</option>
                    </select>
                    <br/>
                  Status:
                    <select name='status' value={ this.state.status } onChange={ this.stausChange }>
                      <option value="New">New</option>
                      <option value="Open">Open</option>
                      <option value="Closed">Closed</option>
                    </select>
                    <hr/>
                    <button type="submit">Save</button>
                    <Link to="/bugs">Back </Link>
                  </form>
                </div>
            );

    }

}

module.exports = bugedit;