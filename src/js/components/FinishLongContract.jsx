/**
 * Created by Nathan on 8/22/2016.
 */

var React       = require( 'react' );



var FinishLongContract = React.createClass({

    isActive:function(){
        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }
    },

    render:function(){

        return (
            <fieldset
                id          = "finishFldset"
                className   = { this.isActive() }
            >
                <h3>Finished! </h3>

                <p>


                </p>
            </fieldset>
        );

    }

});

module.exports = FinishLongContract;
