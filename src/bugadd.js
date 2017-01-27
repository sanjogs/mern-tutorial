var React=require('react');
var FormGroup  = require('react-bootstrap/lib/FormGroup');
var FormControl  = require('react-bootstrap/lib/FormControl');
var ControlLabel  = require('react-bootstrap/lib/ControlLabel');
var HelpBlock  = require('react-bootstrap/lib/HelpBlock');
var Button  = require('react-bootstrap/lib/Button');

function FieldGroup({ id, label, help, props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

var bugadd=class BugAdd extends React.Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e) {
		e.preventDefault();
		var form = document.forms.bugAdd;
		this.props.onBugAdd({
			owner: form.owner.value,
			title: form.title.value,
			status: 'Closed',
			priority: 'P3'
		});
		// clear the form for the next input
		form.owner.value = "";
		form.title.value = "";
	}
	render() {
		return <div className='bug-add'>
           <form name='bugAdd'>
		   <FieldGroup
			id="title" name="title"
			type="text"
			label="Title"
			placeholder="Enter title"
			/>
			<FieldGroup
			id="owner" name="owner"
			type="text"
			label="Owner"
			placeholder="Enter owner"
			/>
             <Button bsStyle="success" onClick={ this.handleSubmit }>Add</Button>
           </form>
         </div>;
	}
}


module.exports=bugadd;
