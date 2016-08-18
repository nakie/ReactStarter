
var React = require('react');

var FrmCheckbox = require( './Checkbox' );
var FrmRadio	= require( './Radio' );
var FrmOption   = require( './Option' );

var OptionGroup = React.createClass({

	getTitle: function(){
		
		if( typeof this.props.title === 'string' ){

			return(
				<label className="optionTitle">{ this.props.title }</label>
			);

		} else {
			return;
		}


	}, // END function getTitle()

    changeValue: function(e){
        // console.log( e.target.value );

        if( typeof( this.props.changeValue) != 'undefined' ){
            this.props.changeValue( e.target.value );
        }

    },

	renderOptions: function( ){

	    //var  propOptions = this.generateOptions();
        var propOptions = [];

        if( typeof( this.props.options ) != 'undefined' ){
            for( var key in this.props.options ){
                propOptions.push( this.generateOptions( key, this.props.options[ key ] ) );
            }
        }

		if( this.props.type == "select" ){

			return(

				<select
                    name        = { this.props.name }
                    disabled    = { this.props.disabled }
                    onChange    = { this.changeValue }
                >
					
				    { this.props.children }

                    { propOptions }

			    </select>
            );

		} else {

		    var children = [];

            children.push( propOptions );
            children.push( this.props.children );

            // if( typeof( this.props.children) != 'undefined' ){
            //     propOptions.push( this.props.children );
            // }

		    // add generated Options to this return statement.
            //c
            //console.log( propOptions );
            //console.log( this.props.children );
			return children ;
		}

	}, // END function renderOptions()

    generateOptions: function( value, title ){

        switch( this.props.type ) {

            case "select":

                return(
                    <FrmOption
                        value   = { value }
                        title   = { title }
                        key     = { value }
                    />
                );
                break;

            case "radio":

               return (
                   <FrmRadio
                        name    = { this.props.name }
                        title   = { title }
                        value   = { value }
                        key     = { value }
                    />
               );
               break;

            default:

               return(
                   <FrmCheckbox
                        name    = { this.props.name }
                        title   = { title }
                        value   = { value }
                        key     = { value }
                    />
               );

        } // END switch ( this.props.type)

    }, // END generateOptions() options
  
	render: function() {		

		return (

			<div className="optionGroup" >

				{ this.getTitle() }

				{ this.renderOptions() }

			</div>

		);

	} // END function render()

});

module.exports = OptionGroup;
