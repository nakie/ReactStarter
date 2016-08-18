

var React 		= require( 'react' );
//var ReactDOM 	= require( 'react-dom' );

// var Tracker 	= require( './FormTracker' );
var TrackedForm = require( './TrackedForm' );

var Form 		= require( 'formsy-react' ).Form;
// Attempting a replacement for import { Form } from 'formsy-react';
// This should get the "Form" variable from the formsy-react module/projct
// <Form /> is a Form Component via Formsy-react

var FrmInput 	= require( './Input' );
var FrmCheckbox = require( './Checkbox' );
var FrmRadio	= require( './Radio' );
var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );

var states = require( '../states' );

var NonResStates = require( './NonResStates' );
var NonResDocuments = require( './NonResDocuments' );

var formSteps = {
	agentInfoFldset: "active",
	addressFldset: "",
	licenseFldset: "",
	finishFldset: ""
}; // END formSteps {}

var activeAddress = {
	primaryAddress: "active",
	homeAddress: "",
	shippingAddress: ""
}; // END activeAddress {}


var addressInfo = {

    primary: {
        address: '',
        address_2: '',
        city: '',
        zip: '',
        state: '',
        homeBusiness: false,
        ship: false,
    },
    home: {
        address: '',
        address_2: '',
        city: '',
        zip: '',
        state: '',
        disabled: false,
        ship: false,
    },
    shipping:{
        address: '',
        address_2: '',
        city: '',
        zip: '',
        state: '',
        disabled: false
    }

}; // END addressInfo {}

var RegistrationFullForm = React.createClass({

	getInitialState: function() {
		return { 
			steps: formSteps,
			address: activeAddress,
            addressInfo: addressInfo,
			nonRes: 'n',
            nonResStates: [],
            resState: ''
		};
	},

	onClick: function( value ) {

		for ( var k in formSteps){
			if( formSteps.hasOwnProperty( k ) ){

				if ( k == value ){
					formSteps[k] = "active"
				}else{
					formSteps[k] = ""
				}
			}
		}

		this.setState( { steps: formSteps  } );

        event.preventDefault();

	},

    changeValue: function( value, model, name ){

        //console.log( model +  "." + name + ": " + value );
        var newState = this.state.addressInfo;

        if( typeof( name ) != 'undefined' ){
            newState[ model ][ name ] = value;
        } else {
            newState[ model ] = value;
        }

        this.setState( newState );

    },

    handleNonResStateSelection: function( selectedStatesArr ){
        // console.log( selectedStatesArr );
        // selectedNonResStates = selectedStatesArr;

        this.setState( { 'nonResStates': selectedStatesArr } );
    },

	handleAddress: function( value ) {

		for( var k in activeAddress){

			if( activeAddress.hasOwnProperty( k ) ){

				if( k == value ){
					activeAddress[k] = "active"
				}else{
					activeAddress[k] = ""
				}
			}
		}

		this.setState( { address: activeAddress  } );
	},

	formToggle: function( toggleAddress ){

        //console.log( "Called: REgistrationFullForm formToggle()" );

        addressInfo = this.state.addressInfo;

        var addresses = this.state.addressInfo;

		//console.log( addresses.primary.ship );

        switch( toggleAddress ) {

            case "shipBusiness":

                addresses.shipping.disabled = !addresses.shipping.disabled;

                addresses.primary.ship = !addresses.primary.ship;

                if( addresses.primary.ship ) {

                    for ( var k in addresses.primary ){

                        //console.log( k );
                        if( addresses.shipping.hasOwnProperty( k ) ){
                            addresses.shipping[k] = addresses.primary[k]
                        }
                    }

                    //addresses.shipping = addresses.primary;

                    addresses.home.ship = false;

                } else {

                    addresses.shipping = addressInfo.shipping;

                }

                break;

            case "homeBusiness":

                addresses.home.disabled = !addresses.home.disabled;

                addresses.primary.homeBusiness = !addresses.primary.homeBusiness;

                if( addresses.primary.homeBusiness ) {

                    for ( var k in addresses.primary ){

                        //console.log( k );
                        if( addresses.home.hasOwnProperty( k ) ){
                            addresses.home[k] = addresses.primary[k]
                        }
                    }

                    //addresses.shipping = addresses.primary;

                } else {

                    addresses.home = addressInfo.home;

                }
                break;

            case "shipHome":

                addresses.shipping.disabled = !addresses.shipping.disabled;

                addresses.home.ship = !addresses.home.ship;

                if( addresses.home.ship ) {

                    for ( var k in addresses.home ){

                        //console.log( k );
                        if( addresses.shipping.hasOwnProperty( k ) ){
                            addresses.shipping[k] = addresses.home[k]
                        }
                    }

                    //addresses.shipping = addresses.primary;

                    addresses.primary.ship = false;

                } else {

                    addresses.shipping = addressInfo.shipping;

                }
                break;

        }

        // console.log( addresses.primary.ship );

        this.setState( { addressInfo: addresses } );

         //console.log( "State Set" );

		// var newState = {};
		// newState[toggleSection] = !this.state[toggleSection]
		// this.setState( newState );
	},

    toggleNonRes: function( value ){

        var newState = { 'nonRes': value };

        this.setState( newState );
    },
	
	getPrimaryAddress: function(){

        var primary = this.state.addressInfo.primary;

		if( this.state.address.primaryAddress == "active" ){

			return( 
					
				<div className= { activeAddress.primaryAddress + ' primaryAddress' } >

					<FrmInput
						name	    = "businessMailingAddress"
						title	    = "Business Mailing Address"
                        value       = { primary.address }
                        changeValue = { this.changeValue }
                        modelGroup  = 'primary'
                        modelValue  = 'address'
					/>

					<FrmInput
						name	= "businessMailingAddressLine2"
						title	= "Business Mailing Address Line 2"
                        value   = { primary.address_2 }
                        changeValue = { this.changeValue }
                        modelGroup  = 'primary'
                        modelValue  = 'address_2'
					/>
					
					<div className="locale">

						<FrmInput 
							name		= "city"
							title		= "City"
                            value       = { primary.city }
                            changeValue = { this.changeValue }
                            modelGroup  = 'primary'
                            modelValue  = 'city'
						/>

						<FrmInput
							name		= "postalCode"
							title		= "Postal Code"
                            value       = { primary.zip }
                            changeValue = { this.changeValue }
                            modelGroup  = 'primary'
                            modelValue  = 'zip'
						/>

						<OptionGroup 
							type	    = "select"
							name	    = "state"
							title	    = "State"
                            selected    = { primary.state }
                            options     = { states }
						>
							
							<FrmOption 
								value	= " " 
								title	= "-- Select One --"
							/>

                        </OptionGroup>

					</div>

					<div className="addressOptions">

						<OptionGroup title="Shipping/Physical Addresses" >
							<FrmCheckbox
								name	        = "shipBusiness"
								title	        = "Ship to this address?"
								defaultChecked  = { primary.ship }
								toggleOption    = { this.formToggle }
								toggleElement   = "shipBusiness"
							/>
						</OptionGroup>

						<OptionGroup title="Home Addresses" >
							<FrmCheckbox
								name		    = "homeBusiness"
								title		    = "Is this your Home Address?"
                                defaultChecked  = { primary.homeBusiness }
								toggleOption    = { this.formToggle }
								toggleElement   = "homeBusiness"
							/>
						</OptionGroup>
						
					</div>
				</div>
			);

		} else{
			return '';
		}
	},

	getHomeAddress: function(){

        var home = this.state.addressInfo.home;

        var homeOption = '';

        if( !this.state.addressInfo.primary.homeBusiness ){

            homeOption = <div className="addressOptions">

                <OptionGroup title="Shipping/Physical Addresses" >
                    <FrmCheckbox
                        name	        = "shipHome"
                        title	        = "Ship to this address?"
                        defaultChecked  = { home.ship }
                        toggleOption    = { this.formToggle }
                        toggleElement   = "shipHome"

                    />
                </OptionGroup>

            </div>

        }

		if( this.state.address.homeAddress == "active" ){

			return( 

				<div className= { activeAddress.homeAddress + ' homeAddress' } >

					<FrmInput
						name	    = "homeMailingAddress"
						title	    = "Home Mailing Address"
                        value       = { home.address }
                        changeValue = { this.changeValue }
                        modelGroup  = 'home'
                        modelValue  = 'address'
                        disabled    = { home.disabled }
					/>

					<FrmInput
						name	    = "homeMailingAddressLine2"
						title	    = "Home homeMailingAddressLine2"
                        value       = { home.address_2 }
                        changeValue = { this.changeValue }
                        modelGroup  = 'home'
                        modelValue  = 'address_2'
                        disabled    = { home.disabled }
					/>

					<div className="locale">

						<FrmInput 
							name		= "homeCity"
							title		= "Home City"
                            value       = { home.city }
                            changeValue = { this.changeValue }
                            modelGroup  = 'home'
                            modelValue  = 'city'
                            disabled    = { home.disabled }
						/>

						<OptionGroup 
							type	= "select" 
							name	= "homeState" 
							title	= "Home State"
                            disabled    = { home.disabled }
                            options     = { states }
						>
							
							<FrmOption
								value	= " "
								title	= "-- Select One--"
							/>

						</OptionGroup>

						<FrmInput
							name		= "homePostalCode"
							title		= "Home Postal Code"
                            value       = { home.zip }
                            changeValue = { this.changeValue }
                            modelGroup  = 'home'
                            modelValue  = 'zip'
                            disabled    = { home.disabled }
						/>

					</div>

                    { homeOption }
					
				</div>
			);

		} else{
			return '';
		}
	},

	getShippingAddress: function(){

        var ship = this.state.addressInfo.shipping;

        //console.log( ship );

		if( this.state.address.shippingAddress == "active" ){

			return( 

				<div className= { activeAddress.shippingAddress + ' shippingAddress' } >

					<FrmInput
						name	    = "shippingAddress"
						title	    = "Shipping Address"
                        value       = {  ship.address }
                        changeValue = { this.changeValue }
                        modelGroup  = 'shipping'
                        modelValue  = 'address'
                        disabled    = { ship.disabled }
					/>

					<FrmInput
						name		= "shippingAddressLine2"
						title		= "Shipping Address Line 2"
                        value       = {  ship.address_2 }
                        changeValue = { this.changeValue }
                        modelGroup  = 'shipping'
                        modelValue  = 'address_2'
                        disabled    = { ship.disabled }
					/>

					<div className="locale">

						<FrmInput 
							name		= "shipToCity"
							title		= "Ship To City"
                            value       = {  ship.city }
                            changeValue = { this.changeValue }
                            modelGroup  = 'shipping'
                            modelValue  = 'city'
                            disabled    = { ship.disabled }
						/>

						<OptionGroup 
							type	= "select" 
							name	= "shipToState" 
							title	= "Ship To State"
                            disabled    = { ship.disabled }
                            options     = { states }
						>
							
							<FrmOption 
								value		= " "
								title		= "-- Select One--"
                                disabled    = { ship.disabled }
							/>

						</OptionGroup>

						<FrmInput
							name		= "shipToPostalCode"
							title		= "Ship To Postal Code"
                            value       = {  ship.zip }
                            changeValue = { this.changeValue }
                            modelGroup  = 'shipping'
                            modelValue  = 'zip'
                            disabled    = { ship.disabled }
						/>

					</div>
					
				</div>
			);

		} else{
			return '';
		}
	},

    getNonResState: function(){
	    if( this.state.nonRes == "Y" ) {
            return (
                <div id="appointedStates">
                    <OptionGroup
                        name="nonResidentState"
                        title="Please Select all States in which you desire to become appointed using your non-resident licensing."
                        options={ states }
                    />
                </div>
            );
        } else {
            return null;
        }
    },

    getResState: function( state ){

        this.setState( { resState: state } );
    },

	render: function(){

        //console.log( "Called: RegistrationFullForm render()" );
        var selectNonResStates = this.getNonResState();

		var helpText = {
			ssn: "Please Note: This cannot be an EIN and is required for appointment."
		};

		var primaryAddress 	= this.getPrimaryAddress();
		var shippingAddress = this.getShippingAddress();
		var homeAddress 	= this.getHomeAddress();

        return(

            <div className="row">

                <aside className="formTracker-container" >
                    <nav className="formTracker-nav ">

                        <ul className=" ">
                            <li className={formSteps.agentInfoFldset} >
                                <a href="#" data-target="agentInfoFldset" onClick={ this.onClick.bind( this, "agentInfoFldset" ) } > Agent Information </a>
                            </li>
                            <li className={formSteps.addressFldset} >
                                <a href="#" data-target="addressFldset" onClick={ this.onClick.bind( this, "addressFldset" ) } > License </a>
                            </li>
                            <li className={formSteps.licenseFldset} >
                                <a href="#" data-target="licenseFldset" onClick={ this.onClick.bind( this, "licenseFldset" )} > Documents </a>
                            </li>

                            <li className = { formSteps.finishFldset    } >
                                <a href="#" data-target="finishFldset" onClick={ this.onClick.bind( this, "finishFldset" ) } > Finish </a>
                            </li>
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

                        <fieldset
                            id        = "agentInfoFldset"
                            className = { formSteps.agentInfoFldset }
                        >

                            <legend> Agent Information </legend>

                            <div className      = "agentName" >

                                <FrmInput
                                    name		= "firstName"
                                    title		= "First Name"
                                    required
                                />

                                <FrmInput
                                    name		= "middleName"
                                    title		= "Middle Name"
                                    required
                                />

                                <FrmInput
                                    name		= "lastName"
                                    title		= "Last Name"
                                    required
                                />

                            </div> {/* END div.agentName */}

                            <FrmInput
                                name		= "dateOfBirth"
                                type		= "date"
                                title		= "Date of Birth"
                                required
                            />

                            <div className = "phoneNumbers">

                                <FrmInput
                                    name		= "phone"
                                    title		= "Phone"
                                    required
                                />

                                <FrmInput
                                    name		= "secondaryPhone"
                                    type		= "tel"
                                    title		= "Secondary Phone"
                                />

                            </div> {/* END div.agentName */}

                            <label>Address</label>

                            <nav className="multiAddress-nav ">
                                <ul className="nav nav-tabs" >
                                    <li className={activeAddress.primaryAddress} >
                                        <a href="#" data-target="primaryAddress" onClick={ this.handleAddress.bind( this, "primaryAddress" ) } > Primary Address </a>
                                    </li>
                                    <li className={activeAddress.homeAddress} >
                                        <a href="#" data-target="homeAddress" onClick={ this.handleAddress.bind( this, "homeAddress" ) } > Home  Address</a>
                                    </li>
                                    <li className={activeAddress.shippingAddress} >
                                        <a href="#" data-target="shippingAddress" onClick={ this.handleAddress.bind( this, "shippingAddress" )} > Shipping  Address</a>
                                    </li>
                                </ul>
                            </nav>

                            { primaryAddress }
                            { homeAddress }
                            { shippingAddress }

                            <div className="emailAddresses">

                                <FrmInput
                                    name		= "primaryEmail"
                                    type		= "email"
                                    title		= "Primary Email"
                                    required
                                />

                                <FrmInput
                                    name		= "secondaryEmail"
                                    type		= "email"
                                    title		= "Secondary Email"
                                />

                            </div> {/* END div.agentName */}

                            <FrmInput
                                name		= "socialSecurity"
                                title		= "Producting Agent Social Security #"
                                helpText 	= { helpText.ssn }
                                required
                            />

                            {/* Research Combining All Option Inputs into a Single Option Group component */}
                            {/* e.g.  Raido Groups / Checkbox Groups and Select Boxes */}
                            {/* Should be able to pass an object with Key/Value pairs to the Option Group */}
                            {/* OR explicitly add options as child of OptionGroup */}

                            <OptionGroup title="Residence Status" >

                                <FrmRadio
                                    name	= "citizenShipStatus"
                                    title	= "US Citizen"
                                    value	= "1"
                                />

                                <FrmRadio
                                    name	= "citizenShipStatus"
                                    title	= "US Permanent Resident"
                                    value	= "2"
                                />

                                <FrmRadio
                                    name	= "citizenShipStatus"
                                    title 	= "Other"
                                    value 	= "0"
                                />

                            </OptionGroup>

                            <button
                                type 		= "button"
                                className 	= "btn btn-default"
                                onClick     = { this.onClick.bind( this, "addressFldset" ) }
                            >
                                Next!
                            </button>

                        </fieldset> { /* END fieldset#agentInfoFldset */}

                        <fieldset id="addressFldset"  className={ formSteps.addressFldset } >
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

                            {/*Alternate NON RES State collection*/}
                            {/*<OptionGroup*/}
                            {/*name= "nonResidentAppointment"*/}
                            {/*title="Do you want to be appointed in any non-resident state(s)?"*/}
                            {/*>*/}
                            {/*<FrmRadio*/}
                            {/*name	= "nonResidentAppointment"*/}
                            {/*value	= "Y"*/}
                            {/*title	= "Yes"*/}
                            {/*changeValue = { this.toggleNonRes }*/}
                            {/*/>*/}
                            {/*<FrmRadio*/}
                            {/*name	= "nonResidentAppointment"*/}
                            {/*value 	= "N"*/}
                            {/*title	= "No"*/}
                            {/*changeValue = { this.toggleNonRes }*/}
                            {/*/>*/}
                            {/*</OptionGroup>*/}


                            {/*{ selectNonResStates }*/}

                            <button
                                type 		= "button"
                                className 	= "btn btn-default"
                                onClick     = { this.onClick.bind( this, "licenseFldset" ) }
                            >
                                Next!
                            </button>
                        </fieldset>


                        <fieldset id="licenseFldset" className={formSteps.licenseFldset} >
                            <legend> Documents</legend>

                            {/*<p>*/}
                                {/*Please attach copies of Resident State and any Non-Resident State(s) licensing, along with Proof of E&amp;O Coverage by uploading them to the the approipate fields below*/}
                            {/*</p>*/}

                            <p>
                                The following documents must be provided to complete your appointment.  Please attach
                                these documents below by clicking "Choose File" and selected the correct document(s) from your computer
                                Alternatively you can provide these documents via fax to: 931-903-1210 or via email to: tsmith@southerninsurance.net
                            </p>

                            <FrmInput
                                name	= "residentStateLicenseDocument"
                                title	= "Resident State License Document"
                                type	= "file"
                            />


                            <NonResDocuments items={ this.state.nonResStates } />

                            {/*<FrmInput*/}
                            {/*name	= "nonResidentLicenseDocument"*/}
                            {/*title	= "Non Resident License Document"*/}
                            {/*type	= "file"*/}
                            {/*/>*/}

                            {/*<FrmInput*/}
                            {/*name	= "nonResidentLicenseDocument"*/}
                            {/*title	= "Non Resident License Document"*/}
                            {/*type	= "file"*/}
                            {/*/>*/}
                            {/*<FrmInput*/}
                            {/*name	= "nonResidentLicenseDocument"*/}
                            {/*title	= "Non Resident License Document"*/}
                            {/*type	= "file"*/}
                            {/*/>*/}


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
                                onClick     = { this.onClick.bind( this, "finishFldset" ) }
                            >
                                Next!
                            </button>

                        </fieldset>

                        <fieldset id="finishFldset" className={formSteps.finishFldset} >
                            <legend>Finish</legend>

                            Please indicate the company(ies) with whom you desire to be appointed. The companies below each offer product in your Resident or Non-Resident state(s).

                            <div className="appointments">

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="humanaApt" className="humanaOpt" value="Y" />
                                        Humana
                                    </label>
                                    <p className='help'>(Medicare Advantage, PDP, Medicare Supplement, Individual Major Medical, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="silverscriptApt" className="silverscript/CVSCaremarkOpt" value="Y" />
                                        Silverscript/CVS Caremark
                                    </label>
                                    <p className='help'> (Prescription Drug Plan) </p>
                                </div>


                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="medicoApt" className="medicoOpt" value="Y" />
                                        Medico
                                    </label>
                                    <p className='help'>(Medicare Supplement, Dental, Vision, Hearing, Hospital Indemnity, Final Expense, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="KemperApt" className="kemperSeniorSolutionsOpt" value="Y" />
                                        Kemper Senior Solutions
                                    </label>
                                    <p className='help'>(Home Health Care)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="standardLifeApt" className="standardLifeCasualtyOpt" value="Y" />
                                        Standard Life &amp; Casualty
                                    </label>
                                    <p className='help'>  (Home Health Care) </p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="wellcareApt" className="wellcareOpt" value="Y" />
                                        Wellcare
                                    </label>
                                    <p className='help'>(Medicare Advantage, Prescription Drug Plans)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="cignaHealthspringApt" className="cignaHealthspringOpt" value="Y" />
                                        Cigna Healthspring
                                    </label>
                                    <p className='help'>(Medicare Advantage) </p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="cignaApt" className="cignaOpt" value="Y" />
                                        Cigna
                                    </label>
                                    <p className='help'> (Medicare Supplement)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="aetnaCoventryApt" className="aetna/CoventryOpt" value="Y" />
                                        Aetna/Coventry
                                    </label>
                                    <p className='help'>(Medicare Advantage)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="aetnaApt" className="aetnaOpt" value="Y" />
                                        Aetna
                                    </label>
                                    <p className='help'>(Medicare Supplement)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="equitableApt" className="equitableOpt" value="Y" />
                                        Equitable
                                    </label>
                                    <p className='help'>(Medicare Supplement)</p>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="gtlApt" className="gTLOpt" value="Y" />
                                        GTL
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="combinedApt" className="combinedOpt" value="Y" />
                                        Combined
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="gerberMedSuppApt" className="gerberOpt" value="Y" />
                                        Gerber
                                    </label>
                                    <p className='help'>(Medicare Supplement)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="gerberFinalApt" className="gerberOpt" value="Y" />
                                        Gerber
                                    </label>
                                    <p className='help'>(Final Expense)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="lifeSecureApt" className="lifeSecureOpt" value="Y" />
                                        Life Secure
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="unitedHomeLifeApt" className="unitedHomeLifeOpt" value="Y" />
                                        United Home Life
                                    </label>
                                    <p className='help'>(Medicare Supplement, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="washingtonNationalApt" className="washingtonNationalOpt" value="Y" />
                                        Washington National
                                    </label>

                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="standardLifeAccidentApt" className="standardLifeandAccidentOpt" value="Y" />
                                        Standard Life and Accident
                                    </label>
                                    <p className='help'>(SLAICO)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="todaysOptionApt" className="todaysOptionsOpt" value="Y" />
                                        Today's Options
                                    </label>
                                    <p className='help'>(Medicare Advantage)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="unitedHealthcareOneApt" className="unitedHealthcareOneOpt" value="Y" />
                                        United Healthcare One
                                    </label>
                                    <p className='help'>(Individual Major Medical, Short Term Medical, etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="humanaOneApt" className="humanaOneOpt" value="Y" />
                                        Humana One
                                    </label>
                                    <p className='help'> (Individual Major Medical, Short Term Medical, Etc.)</p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="silverscriptApt" className="silverscriptOpt" value="Y" />
                                        Silverscript
                                    </label>
                                    <p className='help'></p>
                                </div>

                                <div className="optionGroup">

                                    <label>
                                        <input type="checkbox" name="cignaPdpApt" className="cIGNAOpt" value="Y" />
                                        CIGNA
                                    </label>
                                    <p className='help'> (PDP) </p>
                                </div>

                            </div>

                            <button
                                type 		= "submit"
                                className 	= "btn btn-default"

                            >
                                Submit!
                            </button>
                        </fieldset>
                    </Form>
                </div>

            </div>

        );

    }

});

module.exports = RegistrationFullForm;