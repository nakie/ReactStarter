/**
 * Created by Nathan on 8/23/2016.
 */

var React       = require( 'react' );

var FrmInput 	= require( './Input' );
// var FrmCheckbox = require( './Checkbox' );
// var FrmRadio	= require( './Radio' );
var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );

var states = require( '../states' );
 
var AgentShortForm = React.createClass({

    // getInitialState: function() {
    //
    // },

    nextStep:function(){
        this.props.handleNext( this.props.nextStep );
    },

    isActive:function(){
        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }
    },

    getPostData: function( key ){

        if( typeof( this.props.postData[ key ] ) != 'undefined' ){
            return this.props.postData[ key ];
        }

        return "";

    },

    render: function(){

        // console.log( "HI");
        return(

            <fieldset
                id          = "licenseFldset"
                className   = { this.isActive() }
            >
                <legend> Agent Information</legend>

                <div className = "message" >
                    <h3> Thank You!</h3>
                    <strong>Good news!  You are already in our system</strong> That means you can skip ahead and save time
                    by signing in to your account. Unable to access your account?  Try using our Account Recovery process
                    or contact us directly for assistance. If you prefer to continue with out signing in just complete the form
                    below and we will get the contracting process started for you.
                </div>
                <br />
                <br />

                <div className      = "emailAddresses" >

                    <FrmInput
                        name		= "firstName"
                        title		= "First Name"
                        value       = { this.getPostData( "firstName" ) }
                        required
                    />

                    <FrmInput
                        name		= "lastName"
                        title		= "Last Name"
                        value       = { this.getPostData( "lastName" ) }
                        required
                    />

                </div> {/* END div.agentName */}

                <div className="locale">

                    <FrmInput
                        name    = "city"
                        title	= "City"
                        value   = ""
                        required

                    />

                    <OptionGroup
                        type	= "select"
                        name	= "tate"
                        title	= "State"
                        options = { states }
                        required
                    >

                        <FrmOption
                            value	= ""
                            title	= "-- Select One--"
                        />

                    </OptionGroup>

                    <FrmInput
                        name    = "postalCode"
                        title	= "Zip Code"
                        value   = ""
                        required
                    />

                </div>

                <FrmInput
                    name	= "phone"
                    title	= "Phone"
                    value   = { this.getPostData( "phoneNumber" ) }
                    required
                />


                <div className="emailAddresses">

                    <FrmInput
                        name	        = "primaryEmail"
                        type	        = "email"
                        title	        = "Primary Email"
                        value           = { this.getPostData( "emailAddress" ) }
                        validations     = "isEmail"
                        validationError = "Must be a valid email address"
                        validateOnBlur  = { true }
                        required
                    />

                    <FrmInput
                        name	        = "reEnterEmail"
                        type	        = "email"
                        title	        = "Re-enter Email"
                        value           = ""
                        validations     = "equalsField:primaryEmail"
                        validationError = "Email addresses do not match"
                        validateOnBlur  = { true }
                        required
                    />

                </div> {/* END div.emailAddresses */}

                <button
                    type 		= "submit"
                    className 	= "btn btn-default"
                >
                    Submit!
                </button>

            </fieldset>

        );

    }

});

 
module.exports = AgentShortForm;