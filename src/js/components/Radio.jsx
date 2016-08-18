var React = require( 'react' );

var Form        = require( 'formsy-react' ).Form;
// Attempting a replacement for import { Form } from 'formsy-react';
// This should get the "Form" variable from the formsy-react module/projct
// <Form /> is a Form Component via Formsy-react


var RadioBtn = React.createClass({

    // Add the Formsy Mixin
    mixins: [ Formsy.Mixin ],

    changeValue: function( event ) {

        //console.log( event.target.name );


        this.setState( { [event.target.name]: event.target.value} );

        if (typeof( this.props.changeValue ) == 'undefined') {

            this.setValue(event.currentTarget[this.props.type === 'checkbox' ? 'checked' : 'value']);

        } else{

            this.props.changeValue( event.target.value, this.props.modelGroup, this.props.modelValue );

        }
    },

    render() {

        return (

            <div className="checkbox">
            <label >
                    <input 
                        type        = { 'radio' }
                        name        = { this.props.name }
                        onChange    = { this.changeValue }
                        checked     = { this.props.type === 'radio' && this.getValue() ? 'checked' : null }
                        value       = { this.props.value }
                    />
                    {this.props.title}
                </label>
            </div>

        );

    }
});

module.exports = RadioBtn;
