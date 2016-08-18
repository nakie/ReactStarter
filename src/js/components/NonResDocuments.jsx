/**
 * Created by Nathan on 8/17/2016.
 */
var React 		= require( 'react' );

var FrmInput 	= require( './Input' );


var NonResDocuments  = React.createClass({

    getInputFields: function(){

        if( this.props.items.length ){

            var elements = this.props.items.map( function(obj, key){

                // console.log( obj );
                var zebraClass = ( key % 2 )? "even" : "odd";
                return(

                    <FrmInput
                        name	= { 'nonResState[' + obj.short + ']'}
                        title	= {  obj.full + " Non Resident License Document" }
                        type	= "file"
                        key     = { obj.short }
                    />

                );

            }, this );

            // console.log( elements );
            return( elements );

        }

    },

    render: function(){

        var inputs;
        var helpText;

        if( this.props.items.length ) {

            inputs = this.getInputFields();
            helpText = <p>
                Please attach copies of the selected Non-Resident State(s) licensing below.  If you would like to change the currently selected list of Non-Resident State
                review the License Tab and add/remove states there.( this list will update to reflect)
            </p>;

            var spacer =  <br />;
        }

        return(
            <div className = "nonResDocs">

                {helpText}

                { inputs }

                { spacer }
                { spacer }

            </div>
        );

    }

});

module.exports = NonResDocuments;
