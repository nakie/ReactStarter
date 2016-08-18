/**
 * Created by Nathan on 8/18/2016.
 */

var React       = require('react');

var FrmInput 	= require( './Input' );
// var FrmCheckbox = require( './Checkbox' );
var FrmRadio	= require( './Radio' );
var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );
var NonResStates = require( './NonResStates' );

var states = require( '../states' );

var License = React.createClass({

    getInitialState: function() {
        return {
            nonResStates: [],
            resState: ''
        };
    },

    isActive:function(){
        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }
    },

    getResState: function( state ){
        this.setState( { resState: state } );
    },

    nextStep:function(){

        this.props.handleNext( this.props.nextStep );
    },

    handleNonResStateSelection: function( selectedStatesArr ){
        // console.log( selectedStatesArr );
        // selectedNonResStates = selectedStatesArr;

        this.setState( { 'nonResStates': selectedStatesArr } );
        this.props.reportNonResStates( selectedStatesArr );
    },

    render:function(){

        return(
            <fieldset
                id="addressFldset"
                className = { this.isActive() }
            >
                <legend>License</legend>
                <FrmInput
                    name	= "nationalProducerNumber"
                    title	= "National Producer Number"
                />

                <FrmInput
                    name	= "residentLicenseNumber"
                    title	= "Resident License Number"
                />

                <OptionGroup
                    name    = "residentLicenseState"
                    type    = "select"
                    title   = "Resident License State"
                    options = { states }
                    changeValue = { this.getResState }
                >
                    <FrmOption
                        value	= " "
                        title	= "-- Select One --"
                    />
                </OptionGroup>

                <NonResStates
                    handleSelection     = { this.handleNonResStateSelection }
                    selectedResState    = { this.state.resState }
                />

                <OptionGroup
                    name	= "EOCoverage"
                    title	= "I currently have a minimum of $1M/$1M Life and Health Errors and Ommissions coverage."
                >

                    <FrmRadio
                        name	= "EOCoverage"
                        value	= "Y"
                        title	= "Yes"
                    />

                    <FrmRadio
                        name	= "EOCoverage"
                        value	= "N"
                        title	= "No"
                    />

                </OptionGroup>

                <FrmInput
                    name	= "EOExpriationDate"
                    type	= "date"
                    title	= "E&amp;O Expriation Date"
                />

                {/*{ selectNonResStates }*/}

                <button
                    type 		= "button"
                    className 	= "btn btn-default"
                    onClick     = { this.nextStep }
                >
                    Next!
                </button>
            </fieldset>
        );
    } // END render()
});

module.exports = License;