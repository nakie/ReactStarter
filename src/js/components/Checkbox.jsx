var React = require( 'react' );
var Formsy = require( 'formsy-react' );

var MyCheckbox = React.createClass({

    // Add the Formsy Mixin
    mixins: [ Formsy.Mixin ],

    // propTypes: {
    //   showLabel: React.PropTypes.bool,
    // },

    // getDefaultProps: function(){
    //   return{
    //     showLabel:true
    //   };
    // },

    changeValue: function( event ) {

        // console.log( "Called: Checkbox changeValue(): " + event.currentTarget.checked );
        this.setValue( event.currentTarget[ this.props.type === 'checkbox' ? 'checked' : 'value' ] );

        //console.log( event.currentTarget.checked );
        if( typeof( this.props.toggleOption ) != "undefined" ){
            // console.log( " Toggleing: " + this.props.toggleElement );
            this.props.toggleOption( this.props.toggleElement );
        }

    },

    render() {

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message
        var errorMessage = this.getErrorMessage();

       // console.log( "Called: Checkbox render() for: " + this.props.name );

        var helpText = null;

        if( typeof this.props.helpText !== 'undefined' ){

            helpText = <p className="help-block" >{ this.props.helpText }</p>;

        }

        return (

			<div className="checkbox">
				<label >
                    <input
                        type	        = { 'checkbox' }
                        name	        = { this.props.name }
                        defaultChecked  = { this.props.defaultChecked }
                        onChange        = { this.changeValue }
                        disabled        = { this.props.disabled }
                        value           = { this.props.value }
                    />
                    {  this.props.title }
                </label>
                <span className='validation-error'>{ errorMessage }</span>

                { helpText }
            </div>

        );
    }
});

module.exports = MyCheckbox;
