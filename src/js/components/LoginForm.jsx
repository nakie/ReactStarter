var React       = require( 'react' );

var Form        = require( 'formsy-react' ).Form;
// Attempting a replacement for import { Form } from 'formsy-react';
// This should get the "Form" variable from the formsy-react module/projct
// <Form /> is a Form Component via Formsy-react

var FrmInput    = require( './Input');
var FrmCheckbox = require( './Checkbox' );


var LoginForm = React.createClass({

	getInitialState: function() {
		return { canSubmit: false };
	},

	submit: function(){
		window.location = "/loggedin";
	},

	enableButton: function() {
		this.setState({ canSubmit: true });
	},

	disableButton: function() {
		this.setState({ canSubmit: false });
	},

	render: function() {
		
		return (

			<Form 
				onSubmit={this.submit} 
				onValid={ this.enableButton } 
				onInvalid={ this.disableButton } 
				className=" col-sm-11 col-lg-10 block-center loginFrm" 
			>
				

				<div className="row">

					<FrmInput 
						value ="" 
						name="username" 
						title="Username" 
						className="col-sm-5" 
						showLabel={false}
						required
					/>

					<FrmInput 
						value ="" 
						type="password"
						name="password" 
						title="Password" 
						className="col-sm-5" 
						showLabel={false}
						required 
					/>

					<button 
						type="submit" 
						className="btn btn-default input-sm " 
					>
						Sign In 
					</button>
				
				</div>

				<div className="row">
					<div className="pull-right" >

						<FrmCheckbox 
							name="rememberMe"
							title="Remember Me"
						/>

					</div>
				</div>

			</Form>
		);
	},

});

module.exports = LoginForm;