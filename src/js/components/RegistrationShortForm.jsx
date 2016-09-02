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

	submit: function( data, reset, what ){

        var shortForm = document.getElementById( 'registrationFrm1' );

        //shortForm.submit();

        console.dir( shortForm );

	    if( typeof( this.state[ "nPN" ] ) != "undefined" ){

	    	if( this.state[ "nPN" ] == "123456" ){
                //window.location = "/agent";
                shortForm.action = '/agent';
                // return;
            }
	        // console.log( this.state[ "nPN" ] );
        }

        shortForm.submit();

		// console.log(data);
		// console.log(reset);
		// console.log(what);
		//window.location = "/agent-registration";
		//return true;
	},

	onChange: function( value, model, name, event ){

		var newState = {};

		/** [ event.target.name ] syntax below does not work in IE
		 * this.setState( { [event.target.name]: event.target.value } );
		 *
		 * alteraning to use square bracket notation of reference/setting
		 * an object key works across browsers..
		 *
		 */
		newState[ event.target.name ] = event.target.value;
		this.setState( newState );

        // this.setState( { [event.target.name]: event.target.value } );

        //console.log( this.state );
    },

	enableButton: function() {
		this.setState( { canSubmit: true } );
	},

	disableButton: function() {
		this.setState( { canSubmit: false } );
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
                id			= "registrationFrm1"
				className	= "registrationFrm"
				method      = "POST"
				action      = "/agent-registration"
			>

				<div className="row">

					<FrmInput 
						value 	    = ""
						name	    = "firstName"
						title	    = "First Name"
                        changeValue = { this.onChange }
						required
					/>

					<FrmInput 
						value 	= "" 
						name	= "lastName" 
						title	= "Last Name"
                        changeValue = { this.onChange }
						required
					/>

					<FrmInput 
						value	        = ""
						name	        = "emailAddress"
						type	        = "email"
						title	        = "Email Address"
                        changeValue     = { this.onChange }
                        validations     = "isEmail"
                        validationError = "Must be a valid email address"
						validateOnBlur  = { true }
						required
					/>

					<FrmInput 
						name	= "phoneNumber"
						title	= "Phone Number"
						value   = ""
                        changeValue = { this.onChange }
						required				
					/>

					<FrmInput 
						name	= "nPN"
						title	= "NPN"
                        value   = ""
						helpText = { npnHelpText }
                        changeValue = { this.onChange }
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