/**
 * Created by Nathan on 8/22/2016.
 */

var React = require( 'react' );

var FinishShortContract = React.createClass({

    isActive:function(){
        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }
    },

    render: function(){

        return (

            <fieldset
                id          = "finishFldset"
                className   = { this.isActive() }
            >
                <h3>Finished! </h3>

                <p>
                    <strong>Your request has been submitted and we look forward to working with you.</strong>
                </p>

                <p>
                    A confirmation email will be sent to the email address you provided.  Someone from Southern will
                    reaching out to you as soon as possible.
                </p>

            </fieldset>
        );

    }

});

module.exports = FinishShortContract;
