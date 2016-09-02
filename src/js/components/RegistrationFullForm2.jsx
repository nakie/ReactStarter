/**
 * Created by Nathan on 8/18/2016.
 */

var React 		= require( 'react' );

// var Tracker 	= require( './FormTracker' );
var TrackedForm = require( './TrackedForm' );

var Form 		= require( 'formsy-react' ).Form;
// Attempting a replacement for import { Form } from 'formsy-react';
// This should get the "Form" variable from the formsy-react module/projct
// <Form /> is a Form Component via Formsy-react

// var FrmInput 	= require( './Input' );
// var FrmCheckbox = require( './Checkbox' );
// var FrmRadio	= require( './Radio' );
// var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );

var states = require( '../states' );

var AgentInformation	= require( './AgentInformation' );
var License	            = require( './License' );
var Documents	        = require( './Documents' );
var Companies	        = require( './Companies' );
var FinishContract      = require( './FinishLongContract' );

var formSteps = {
    agentInfoFldset: "active",
    licenseFldset: "",
    documentsFldset: "",
    companiesFldset: "",
    finishFldset: ""
}; // END formSteps {}


var RegistrationFullForm2 = React.createClass({

    getInitialState: function() {
        return {
            steps: formSteps,
            nonResStates: [],
        };
    },

    onClick: function( value, event ) {

        for ( var k in formSteps ){

            if( formSteps.hasOwnProperty( k ) ){

                if ( k == value ){
                    formSteps[k] = "active"
                }else{
                    formSteps[k] = ""
                }
            }
        }

        this.setState( { steps: formSteps  } );

        if( typeof( event ) != 'undefined' ){

            event.preventDefault();
        }

    },

    reportNonResStates: function( nonResStateArray ){

        this.setState( { 'nonResStates': nonResStateArray } );
    },

    changeValue: function( value, model, name ){

        //console.log( model +  "." + name + ": " + value );
        var newState = this.state.addressInfo;

        if( typeof( name ) != 'undefined' ){
            newState[ model ][ name ] = value;
        } else {
            newState[ model ] = value;
        }

        this.setState( newState );

    },

    toggleNonRes: function( value ){

        var newState = { 'nonRes': value };

        this.setState( newState );

    },

    render: function(){

        //console.log( "Called: RegistrationFullForm render()" );
        //var selectNonResStates = this.getNonResState();

        //console.log( this.props.data );
        return(

            <div className="row">

                <aside className="formTracker-container" >
                    <nav className="formTracker-nav ">

                        <ul className=" ">
                            <li className={formSteps.agentInfoFldset} >
                                <a href="#" data-target="agentInfoFldset" onClick={ this.onClick.bind( this, "agentInfoFldset" ) } > Agent Information </a>
                            </li>
                            <li className={formSteps.licenseFldset} >
                                <a href="#" data-target="licenseFldset" onClick={ this.onClick.bind( this, "licenseFldset" ) } > License </a>
                            </li>
                            <li className={formSteps.documentsFldset} >
                                <a href="#" data-target="documentsFldset" onClick={ this.onClick.bind( this, "documentsFldset" )} > Documents </a>
                            </li>
                            <li className={formSteps.companiesFldset} >
                                <a href="#" data-target="companiesFldset" onClick={ this.onClick.bind( this, "companiesFldset" )} > Companies </a>
                            </li>
                            <li className = { formSteps.finishFldset } >
                                <a href="#" data-target="finishFldset" onClick={ this.onClick.bind( this, "finishFldset" ) } > Finish </a>
                            </li>
                        </ul>

                    </nav>
                </aside> {/* END aside.formTracker-container */}

                <div className= "formBody">

                    <Form
                        onSubmit    = { this.submit }
                        onValid     = { this.enableButton }
                        onInvalid   = { this.disableButton }
                        className   = " col-sm-11 col-lg-10 block-center loginFrm"
                    >

                        <AgentInformation
                            active      = { formSteps.agentInfoFldset }
                            handleNext  = { this.onClick }
                            nextStep    = { "licenseFldset" }
                            postData    = { this.props.data }
                        />

                        <License
                            active      = { formSteps.licenseFldset }
                            handleNext  = { this.onClick }
                            nextStep    = { "documentsFldset" }
                            reportNonResStates = { this.reportNonResStates }
                            postData    = { this.props.data }
                        />

                        <Documents
                            active      = { formSteps.documentsFldset }
                            handleNext  = { this.onClick }
                            nextStep    = { "companiesFldset" }
                            nonResStates = { this.state.nonResStates }
                        />

                        <Companies
                            active      = { formSteps.companiesFldset }
                            handleNext  = { this.onClick }
                            nextStep    = { "finishFldset" }
                        />

                        <FinishContract
                            active={ formSteps.finishFldset }
                        />

                    </Form>
                </div>

            </div>

        );

    }

});

module.exports = RegistrationFullForm2;