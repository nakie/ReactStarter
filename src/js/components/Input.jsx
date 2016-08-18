var React = require( 'react' );
var Formsy = require( 'formsy-react' );

var MyLabel = require( './Label' );

var suffix = {
	
	default:  "Txt",

	button:   "Btn",
	checkbox: "Opt",
	email:    "Eml",
	file:     "Fl",
	image:    "Img",
	number:   "Num",
	radio:    "Opt",
	text:     "Txt",
	radio:    "Opt",    
	submit:   "Btn",    
	reset:    "Btn"

};

var MyInput = React.createClass( {

	// Add the Formsy Mixin
	mixins: [ Formsy.Mixin ],

	// setValue() will set the value of the component, which in
	// turn will validate it and the rest of the form

	changeValue: function( event ) {

        //console.log( event.target.name );


        this.setState( { [event.target.name]: event.target.value} );

        if (typeof( this.props.changeValue ) == 'undefined') {

            this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);

        } else{

            this.props.changeValue( event.target.value, this.props.modelGroup, this.props.modelValue );

        }
	},

    showValue: function(){

        if( typeof( this.state[ this.props.name ] ) != 'undefined' ) {
            return this.state[ this.props.name ];
        } else {
            return this.props.value;
        }
    },

    isDisabled: function(){

        console.log( "Disabled: " + this.props.disabled );

        if( this.props.disabled == true ){
            return true;
        }

        return false;
    },

	render: function() {
		
		// Set a specific className based on the validation
		// state of this component. showRequired() is true
		// when the value is empty and the required prop is
		// passed to the input. showError() is true when the
		// value typed is invalid
		var className = 'inputGroup' + ' ' + ( this.props.className || ' ' ) + ' ' +
			( this.showRequired() ? 'required' : this.showError() ? 'error' : '' );

		// An error message is returned ONLY if the component is invalid
		// or the server has returned an error message
		var errorMessage = this.getErrorMessage();

		var helpText = null;

		if( typeof this.props.helpText !== 'undefined' ){

			helpText = <p className="help-block" >{ this.props.helpText }</p>;

		}

		var elementID = '';

		if( suffix.hasOwnProperty( this.props.type ) ){

			elementID = this.props.name + suffix[ this.props.type ];

		}else{

			elementID = this.props.name + suffix.default;
		}

		var isRequired = false;

		if( this.props.required == true ){
			isRequired = "required";
		}

		// Init placeholder Test to Empty( Null ) String
		// Only place placeholder test when Labels are turned off
		var placeholderValue = '';

		if( this.props.showLabel === false ){
			placeholderValue = this.props.title;
		}

		return (

			<div className = { className }>

			<MyLabel
				showLabel 	= { this.props.showLabel }
				name 		= { elementID }
				title 		= { this.props.title } 
			/>

			<input
				id          = { elementID }
				type        = { this.props.type || 'text' }
				name        = { this.props.name }
				onChange    = { this.changeValue }
				value       = { this.showValue() }
				placeholder = { placeholderValue }
				required    = { isRequired }
				disabled    = { this.props.disabled }
			/>

			<span className='validation-error'>{ errorMessage }</span>

			{ helpText }

			</div>

		);
	}
});

module.exports = MyInput;
