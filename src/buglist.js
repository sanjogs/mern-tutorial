var React = require('react');
var BugFilter = require('./bugfilter.js');
var BugAdd = require('./bugadd.js');
var $ = require('jquery');

class BugRow extends React.Component {

  render() {
    return (<tr className='bug-row'>
              <td>
                { this.props.bug.id }
              </td>
              <td>
                { this.props.bug.status }
              </td>
              <td>
                { this.props.bug.priority }
              </td>
              <td>
                { this.props.bug.owner }
              </td>
              <td>
                { this.props.bug.title }
              </td>
            </tr>);
  }
}
class BugTable extends React.Component {

  render() {
    var bugrow = this.props.bugs.map((bug) => {
      return <BugRow key={ bug.id } bug={ bug } />
    });
    return (<div className='bug-table'>
              <table>
                <thead>
                  <tr className='bug-row'>
                    <th>
                      ID
                    </th>
                    <th>
                      Status
                    </th>
                    <th>
                      Priority
                    </th>
                    <th>
                      Owner
                    </th>
                    <th>
                      Title
                    </th>
                  </tr>
                </thead>
                <tbody>
                  { bugrow }
                </tbody>
              </table>
            </div>);
  }
}
var buglist = class BugList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bugs: []
    };
  }

  loadData(filter) {
    $.get('/api/bugs', {
      status: filter.status,
      priority: filter.priority
    }, function(data) {
      this.setState({
        bugs: []
      })
      if (data) {
        this.setState({
          bugs: data
        });
      }
    }.bind(this));
  }
  changeFilter(filter) {
    this.props.router.push({
      search: '?' + $.param(filter)
    });
    this.loadData(filter);
  }
  componentDidMount() {
    this.loadData(this.props.location.query);
  }

  addBug(bug) {

    $.post('/api/bugs', bug, function(d) {
      if (d) {
        var _bugs = this.state.bugs.concat(d);
        this.setState({
          bugs: _bugs
        });
      }
    }.bind(this));

  }

  render() {

    return <div id='bug-list'>
             <h1>Bug Tracker </h1>
             <BugFilter onSearch={ (filter) => this.changeFilter(filter) } initFilter={ this.props.location.query } />
             <BugTable bugs={ this.state.bugs } />
             <BugAdd onBugAdd={ (bug) => this.addBug(bug) } />
           </div>;
  }
}


module.exports = buglist;