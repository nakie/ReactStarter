/**
 * Created by Nathan on 8/18/2016.
 */

var React       = require('react');

var FrmInput 	= require( './Input' );
// var FrmCheckbox = require( './Checkbox' );
// var FrmRadio	= require( './Radio' );
// var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );
var NonResStates = require( './NonResStates' );

var states = require( '../states' );

var NonResDocuments = require( './NonResDocuments' );

var Documents = React.createClass({

    isActive:function(){
        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }
    },

    nextStep:function(){
        this.props.handleNext( this.props.nextStep );
    },

    getNonResStates(){
        if( typeof( this.props.nonResStates ) != 'undefined' ){
            return this.props.nonResStates;
        } else {
            return [];
        }
    },

    render:function(){


        return(
            <fieldset
                id="licenseFldset"
                className = { this.isActive() }
            >
                <legend> Documents</legend>

                {/*<p>*/}
                {/*Please attach copies of Resident State and any Non-Resident State(s) licensing, along with Proof of E&amp;O Coverage by uploading them to the the approipate fields below*/}
                {/*</p>*/}

                <p>
                    The following documents must be provided to complete your appointment.  Please attach
                    these documents below by clicking "Choose File" and selected the correct document(s) from your computer
                    Alternatively you can provide these documents via fax to: 931-903-1210 or via email to: tsmith@southerninsurance.net
                </p>

                <br />
                <br />

                <FrmInput
                    name	= "residentStateLicenseDocument"
                    title	= "Resident State License Document"
                    type	= "file"
                />

                <br />
                <br />

                <NonResDocuments
                    items={ this.getNonResStates() }
                />

                <FrmInput
                    name	= "eOProofofCoverage"
                    title	= "E&amp;O Proof of Coverage"
                    type	= "file"
                />

                <p>
                    <strong> Please note:</strong> Your appointment request will be pended until receipt of the required documentation.
                    As soon as possible, please submit any documents not attached to this form via fax to: 931-903-1210 or via email to: tsmith@southerninsurance.net
                </p>

                <button
                    type 		= "button"
                    className 	= "btn btn-default"
                    onClick     = { this.nextStep }
                >
                    Next!
                </button>

            </fieldset>

        );
    }
});


module.exports = Documents;
