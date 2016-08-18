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

var FrmInput 	= require( './Input' );
var FrmCheckbox = require( './Checkbox' );
var FrmRadio	= require( './Radio' );
var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );

var states = require( '../states' );

var AgentInformation	= require( './AgentInformation' );
var License	= require( './License' );
var Documents	= require( './Documents' );

var formSteps = {
    agentInfoFldset: "active",
    addressFldset: "",
    licenseFldset: "",
    finishFldset: ""
}; // END formSteps {}


var RegistrationFullForm2 = React.createClass({

    getInitialState: function() {
        return {
            steps: formSteps,
            nonResStates: [],
        };
    },

    onClick: function( value ) {

        for ( var k in formSteps){

            if( formSteps.hasOwnProperty( k ) ){

                if ( k == value ){
                    formSteps[k] = "active"
                }else{
                    formSteps[k] = ""
                }
            }
        }

        this.setState( { steps: formSteps  } );

        event.preventDefault();

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

        return(

            <div className="row">

                <aside className="formTracker-container" >
                    <nav className="formTracker-nav ">

                        <ul className=" ">
                            <li className={formSteps.agentInfoFldset} >
                                <a href="#" data-target="agentInfoFldset" onClick={ this.onClick.bind( this, "agentInfoFldset" ) } > Agent Information </a>
                            </li>
                            <li className={formSteps.addressFldset} >
                                <a href="#" data-target="addressFldset" onClick={ this.onClick.bind( this, "addressFldset" ) } > License </a>
                            </li>
                            <li className={formSteps.licenseFldset} >
                                <a href="#" data-target="licenseFldset" onClick={ this.onClick.bind( this, "licenseFldset" )} > Documents </a>
                            </li>

                            <li className = { formSteps.finishFldset    } >
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
                            active={ formSteps.agentInfoFldset }
                            handleNext = { this.onClick }
                            nextStep = { "addressFldset" }
                        />

                        <License
                            active={ formSteps.addressFldset }
                            handleNext = { this.onClick }
                            nextStep = { "licenseFldset" }
                            reportNonResStates = { this.reportNonResStates }
                        />


                        <Documents
                            active={ formSteps.licenseFldset }
                            handleNext = { this.onClick }
                            nextStep = { "finishFldset" }
                            nonResStates = { this.state.nonResStates }
                        />

                        <fieldset id="finishFldset" className={formSteps.finishFldset} >
                            <legend>Finish</legend>

                            Please indicate the company(ies) with whom you desire to be appointed. The companies below each offer product in your Resident or Non-Resident state(s).

                            <div className="appointments">

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="humanaApt" className="humanaOpt" value="Y" />
                                        Humana
                                    </label>
                                    <p className='help'>(Medicare Advantage, PDP, Medicare Supplement, Individual Major Medical, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="silverscriptApt" className="silverscript/CVSCaremarkOpt" value="Y" />
                                        Silverscript/CVS Caremark
                                    </label>
                                    <p className='help'> (Prescription Drug Plan) </p>
                                </div>


                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="medicoApt" className="medicoOpt" value="Y" />
                                        Medico
                                    </label>
                                    <p className='help'>(Medicare Supplement, Dental, Vision, Hearing, Hospital Indemnity, Final Expense, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="KemperApt" className="kemperSeniorSolutionsOpt" value="Y" />
                                        Kemper Senior Solutions
                                    </label>
                                    <p className='help'>(Home Health Care)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="standardLifeApt" className="standardLifeCasualtyOpt" value="Y" />
                                        Standard Life &amp; Casualty
                                    </label>
                                    <p className='help'>  (Home Health Care) </p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="wellcareApt" className="wellcareOpt" value="Y" />
                                        Wellcare
                                    </label>
                                    <p className='help'>(Medicare Advantage, Prescription Drug Plans)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="cignaHealthspringApt" className="cignaHealthspringOpt" value="Y" />
                                        Cigna Healthspring
                                    </label>
                                    <p className='help'>(Medicare Advantage) </p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="cignaApt" className="cignaOpt" value="Y" />
                                        Cigna
                                    </label>
                                    <p className='help'> (Medicare Supplement)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="aetnaCoventryApt" className="aetna/CoventryOpt" value="Y" />
                                        Aetna/Coventry
                                    </label>
                                    <p className='help'>(Medicare Advantage)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="aetnaApt" className="aetnaOpt" value="Y" />
                                        Aetna
                                    </label>
                                    <p className='help'>(Medicare Supplement)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="equitableApt" className="equitableOpt" value="Y" />
                                        Equitable
                                    </label>
                                    <p className='help'>(Medicare Supplement)</p>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="gtlApt" className="gTLOpt" value="Y" />
                                        GTL
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="combinedApt" className="combinedOpt" value="Y" />
                                        Combined
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="gerberMedSuppApt" className="gerberOpt" value="Y" />
                                        Gerber
                                    </label>
                                    <p className='help'>(Medicare Supplement)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="gerberFinalApt" className="gerberOpt" value="Y" />
                                        Gerber
                                    </label>
                                    <p className='help'>(Final Expense)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="lifeSecureApt" className="lifeSecureOpt" value="Y" />
                                        Life Secure
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="unitedHomeLifeApt" className="unitedHomeLifeOpt" value="Y" />
                                        United Home Life
                                    </label>
                                    <p className='help'>(Medicare Supplement, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="washingtonNationalApt" className="washingtonNationalOpt" value="Y" />
                                        Washington National
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="standardLifeAccidentApt" className="standardLifeandAccidentOpt" value="Y" />
                                        Standard Life and Accident
                                    </label>
                                    <p className='help'>(SLAICO)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="todaysOptionApt" className="todaysOptionsOpt" value="Y" />
                                        Today's Options
                                    </label>
                                    <p className='help'>(Medicare Advantage)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="unitedHealthcareOneApt" className="unitedHealthcareOneOpt" value="Y" />
                                        United Healthcare One
                                    </label>
                                    <p className='help'>(Individual Major Medical, Short Term Medical, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="humanaOneApt" className="humanaOneOpt" value="Y" />
                                        Humana One
                                    </label>
                                    <p className='help'> (Individual Major Medical, Short Term Medical, Etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="silverscriptApt" className="silverscriptOpt" value="Y" />
                                        Silverscript
                                    </label>
                                    <p className='help'></p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="cignaPdpApt" className="cIGNAOpt" value="Y" />
                                        CIGNA
                                    </label>
                                    <p className='help'> (PDP) </p>
                                </div>

                            </div>

                            <button
                                type 		= "submit"
                                className 	= "btn btn-default"

                            >
                                Submit!
                            </button>
                        </fieldset>
                    </Form>
                </div>

            </div>

        );

    }

});

module.exports = RegistrationFullForm2;