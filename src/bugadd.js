var React=require('react');


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
             <input type='text' name='title' placeholder='bug title' />
             <input type='text' name='owner' placeholder='owner' />
             <button type='submit' onClick={ this.handleSubmit }>Add</button>
           </form>
         </div>;
	}
}


module.exports=bugadd;
