var React = require("react");
var $ = require("jquery");
var Link = require('react-router').Link;

var Grid = require('react-bootstrap/lib/Grid');
var Row = require('react-bootstrap/lib/Row');
var Col = require('react-bootstrap/lib/Col');
var Panel = require('react-bootstrap/lib/Panel');
var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var Button = require('react-bootstrap/lib/Button');


var bugedit = class BugEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.titleChange = this.titleChange.bind(this);
        this.priorityChange = this.priorityChange.bind(this);
        this.ownerChange = this.ownerChange.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        $.get('/api/bugs/' + this.props.params.id, function(data) {

            this.setState(data);
        }.bind(this));


    }
    titleChange(e) {
        this.setState({
            title: e.target.value
        });
    }
    ownerChange(e) {
        this.setState({
            owner: e.target.value
        });
    }
    priorityChange(e) {
        this.setState({
            priority: e.target.value
        });
    }
    statusChange(e) {
        this.setState({
            status: e.target.value
        });
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
        return (
            <Grid>
              <Row>
                <Col md={ 6 }>
                <Panel>
                  <Form horizontal name="bugedit" onSubmit={ this.submit }>
                    <FormGroup controlId="title">
                      <Col componentClass={ ControlLabel } sm={ 2 }> Title
                      </Col>
                      <Col sm={ 10 }>
                      <FormControl type="text" name="title" placeholder="Title" value={ this.state.title } onChange={ this.titleChange } />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="owner">
                      <Col componentClass={ ControlLabel } sm={ 2 }> Owner
                      </Col>
                      <Col sm={ 10 }>
                      <FormControl type="text" name="owner" placeholder="Owner" value={ this.state.owner } onChange={ this.ownerChange } />
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="priority">
                      <Col sm={ 2 }>
                      <ControlLabel>Priority</ControlLabel>
                      </Col>
                      <Col sm={ 10 }>
                      <FormControl componentClass="select" name="priority" placeholder="Priority" value={ this.state.priority } onChange={ this.priorityChange }>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                        <option value="P3">P3</option>
                      </FormControl>
                      </Col>
                    </FormGroup>
                    <FormGroup controlId="status">
                      <Col sm={ 2 }>
                      <ControlLabel>Status</ControlLabel>
                      </Col>
                      <Col sm={ 10 }>
                      <FormControl componentClass="select" name="status" placeholder="Status" value={ this.state.status } onChange={ this.stausChange }>
                        <option value="New">New</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                      </FormControl>
                      </Col>
                    </FormGroup>
                    <FormGroup>
                      <Col smOffset={ 2 } sm={ 10 }>
                      <Button type="submit">Save</Button>
                      <Link to="/bugs">Back </Link>
                      </Col>
                    </FormGroup>
                  </Form>
                </Panel>
                </Col>
              </Row>
            </Grid>
            );

    }

}

module.exports = bugedit;