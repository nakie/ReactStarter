/**
 * Created by Nathan on 8/23/2016.
 */

var React   = require( 'react' );

var Form 	= require( 'formsy-react' ).Form;
var AgentShortForm      = require( './AgentShortForm' );
var Companies	        = require( './Companies' );
var FinishContract      = require( './FinishShortContract' );

var formSteps = {
    agentInfoFldset: "active",
    licenseFldset: "",
    documentsFldset: "",
    companiesFldset: "",
    finishFldset: ""
}; // END formSteps {}

var CurrentAgent = React.createClass({

    // getInitialState: function() {
    //
    // },
    getInitialState: function() {
        return {
            steps: formSteps,
        };
    },

    onClick: function( value, event ) {

        for ( var k in formSteps ){

            if( formSteps.hasOwnProperty( k ) ){

                if ( k == value ){
                    formSteps[k] = "active"
                }else{
                    formSteps[k] = ""
                }
            }
        }

        this.setState( { steps: formSteps  } );

        if( typeof( event ) != 'undefined' ){

            event.preventDefault();
        }

    },

    submit: function(){
        this.onClick( "finishFldset" );
    },

    render: function(){

        return(

            <div className="row">

                <aside className="formTracker-container" >
                    <nav className="formTracker-nav ">

                        <ul className=" ">
                            <li className={formSteps.agentInfoFldset} >
                                <a href="#" data-target="agentInfoFldset" onClick={ this.onClick.bind( this, "agentInfoFldset" ) } > Agent Information </a>
                            </li>
                            {/*<li className={formSteps.companiesFldset} >*/}
                                {/*<a href="#" data-target="companiesFldset" onClick={ this.onClick.bind( this, "companiesFldset" )} > Companies </a>*/}
                            {/*</li>*/}
                            {/*<li className = { formSteps.finishFldset } >*/}
                                {/*<a href="#" data-target="finishFldset" onClick={ this.onClick.bind( this, "finishFldset" ) } > Finish </a>*/}
                            {/*</li>*/}
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

                        <AgentShortForm
                            active      = { formSteps.agentInfoFldset }
                            handleNext  = { this.onClick }
                            nextStep    = { "finishFldset" }
                            postData        = { this.props.data }
                        />

                        {/*<Companies*/}
                            {/*active      = { formSteps.companiesFldset }*/}
                            {/*handleNext  = { this.onClick }*/}
                            {/*nextStep    = { "finishFldset" }*/}
                        {/*/>*/}

                        <FinishContract
                            active = { formSteps.finishFldset }
                        />

                    </Form>
                </div>

            </div>
        );

    }

});

module.exports = CurrentAgent;