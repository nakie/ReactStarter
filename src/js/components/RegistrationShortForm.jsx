var React 		= require( 'react' );
var ReactDom 	= require( 'react-dom' );

var Form 		= require( 'formsy-react' ).Form;
// Attempting a replacement for import { Form } from 'formsy-react';
// This should get the "Form" variable from the formsy-react module/projct
// <Form /> is a Form Component via Formsy-react

var FrmInput 	= require( './Input');
var FrmCheckbox = require( './Checkbox' );


var RegistrationShortForm = React.createClass({

	getInitialState: function() {
		return { canSubmit: false };
	},

	submit: function(){
		window.location = "/agent-registration";
	},

	enableButton: function() {
		this.setState({ canSubmit: true });
	},

	disableButton: function() {
		this.setState({ canSubmit: false });
	},

	render: function() {

		var npnHelpText = ( 
			<span> 
				<a 	className="" 
					href="https://pdb.nipr.com/html/PacNpnSearch.html" 
					target="_blank" 
					title="Launch NPN search in a new window." 
				>
					NPN Lookup
				</a>
			</span> 
		);

		return (

			<Form 
				onSubmit	= { this.submit } 
				onValid		= { this.enableButton } 
				onInvalid	= { this.disableButton } 
				className	= "registrationFrm" 
			>

				<div className="row">

					<FrmInput 
						value 	= "" 
						name	= "firstName" 
						title	= "First Name"
						required
					/>

					<FrmInput 
						value 	= "" 
						name	= "lastName" 
						title	= "Last Name"
						required
					/>

					<FrmInput 
						value	= ""
						name	= "emailAddress"
						type	= "email"
						title	= "Email Address"
						required
					/>

					<FrmInput 
						name	= "phoneNumber"
						title	= "Phone Number"
						required				
					/>

					<FrmInput 
						name	= "nPN"
						title	= "NPN"
						helpText= { npnHelpText }
						required 
					/>

					<button 
						type = "submit" 
						className = "btn btn-default pull-right" 
					>
						Get Started
					</button>
				
				</div>

			</Form>
		);
	},

});

module.exports = RegistrationShortForm;