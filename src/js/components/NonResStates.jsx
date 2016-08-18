/**
 * Created by Nathan on 8/16/2016.
 */

var React 		= require( 'react' );
var Autosuggest = require( 'react-autosuggest' );
var MyLabel     = require( './Label' );

var states = require( '../statesArray' );


// function getSuggestions( value ) {
//
//     var inputValue = value.trim().toLowerCase();
//     var inputLength = inputValue.length;
//
//     return (inputLength === 0) ? [] : states.filter( function(state){
//
//         var curState = state.full.toLowerCase().slice( 0, inputLength);
//         var alreadySelected = false;
//
//         var selectedArr = this.state.selected;
//
//         for( var i = 0; i < selectedArr.length; i++){
//             if( state == selectedArr[i].full ){
//                 alreadySelected = true;
//             }
//
//         }
//
//         return ( curState === inputValue) && !alreadySelected;
//     });
//
// }

function getSuggestionValue( suggestion ) { // when suggestion is selected, this function tells
    return suggestion.full;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.full}</span>
    );
}

var NonResStates = React.createClass({

    getInitialState: function() {
        return {
            value: '',
            suggestions: [],
            selected: []
        };
    },

    onChange: function( event, { newValue } ){

        this.setState({
            value: newValue
        });

    },

    onSuggestionsUpdateRequested: function({ value }) {

        this.setState({
            suggestions: this.getSuggestions( value )
        });
    },

    getSuggestions: function( value ) {

        var inputValue = value.trim().toLowerCase();
        var inputLength = inputValue.length;
        var selectedArr = this.state.selected;
        var residentState = this.props.selectedResState;

        return( inputLength === 0 ) ? [] : states.filter( function( state ){

            var curState = state.full.toLowerCase().slice( 0, inputLength );
            var alreadySelected = false;

            // Prevent display of currently selected Non-Resident States
            for( var i = 0; i < selectedArr.length; i++ ){
                if( state.full == selectedArr[ i ].full ){
                    alreadySelected = true;
                }
            }

            // Prevent display of currently selected Resident State
            if( state.short == residentState ){
                alreadySelected = true;
            }

            return ( curState === inputValue ) && !alreadySelected;
        });

    }, // END function getSuggestion()

    addState: function(){
        // console.log( this.state.value );
        if( this.state.value ) {

            var selectedArr = this.state.selected;

            for( var i = 0; i < states.length; i++){
                if( this.state.value == states[i].full ){
                    selectedArr.push( states[i] );
                }
            }

            //selectedArr.push( this.state.value );
            this.setState( selectedArr );

            this.props.handleSelection( selectedArr );

            this.setState({
                    value: ''
                });
        }

    },

    showSelected: function(){

        var elements = this.state.selected.map( function(obj, key){
            // console.log( obj );
            var zebraClass = ( key % 2 ) ? "even" : "odd";
            return(
                <li
                    className = { zebraClass }
                    key={ obj.short }
                >
                    { obj.full }
                    <button
                        type 		= "button"
                        className 	= "btn btn-default"
                        onClick     = { this.rmState.bind( this, obj.full ) }
                    >
                        &times;
                    </button>
                </li>
            );
        }, this );

        // console.log( elements );
        return( elements );

    },

    rmState: function( fullName ){

        // console.log( fullName );

        var selectedArr = this.state.selected;

        for( var i = 0; i < states.length; i++){
            if( fullName == states[i].full ){
                selectedArr.splice( i, 1 );
            }
        }

        //selectedArr.push( this.state.value );
        this.props.handleSelection( selectedArr );

        this.setState( selectedArr );

    },

    onSuggestionSelected: function(){
        // console.log( "selected" );
        // this.addState();
        //
        // this.setState({
        //     value: ''
        // });

    },

    render: function() {

        // console.log( this.props.selectedResState );

        var myTheme = {
            container:            'acContainer',
            containerOpen:        'acContainer--open',
            input:                'acContainerInput form-control',
            suggestionsContainer: 'acSuggestions',
            suggestionsList:      'acSuggestions-list',
            suggestion:           'acSuggestion',
            suggestionFocused:    'acSuggestion--focused',
            sectionContainer:     'acSection',
            sectionTitle:         'acSectionTitle'
        };

        // console.log( "render" );
        // const { value, suggestions } = this.state;
        var value = this.state.value;
        var inputProps = {
            placeholder: 'Enter a State and click Add',
            value,
            onChange: this.onChange
        };

        var selectedStates = null;

        if (this.state.selected.length) {
             // console.log( this.state.selected );
            selectedStates = <ul className="selected"> { this.showSelected() }</ul>;
        }

        return (

            <div id="nonResStates" >

                <MyLabel
                    title 		= "Do you want to be appointed in any non-resident state(s)?"
                />

                <div className = " input-group">

                    <Autosuggest
                        suggestions                     = { this.state.suggestions }
                        onSuggestionsUpdateRequested    = { this.onSuggestionsUpdateRequested }
                        getSuggestionValue              = { getSuggestionValue }
                        renderSuggestion                = { renderSuggestion }

                        inputProps                      = { inputProps }
                        theme                           = { myTheme }
                        onSuggestionSelected            = { this.onSuggestionSelected }
                    />

                    <span className="input-group-btn">
                        <button
                            type 		= "button"
                            className 	= "btn btn-default"
                            onClick     = { this.addState }
                        >
                        Add!
                    </button>
                    </span>

                </div>

                { selectedStates }

            </div>

        );
    }

});

module.exports = NonResStates;
