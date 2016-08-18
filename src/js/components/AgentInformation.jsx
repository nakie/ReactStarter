/**
 * Created by Nathan on 8/18/2016.
 */

var React       = require('react');

var FrmInput 	= require( './Input' );
var FrmCheckbox = require( './Checkbox' );
var FrmRadio	= require( './Radio' );
var FrmOption   = require( './Option' );
var OptionGroup	= require( './OptionGroup' );

var states = require( '../states' );

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


var AgentInformation = React.createClass({

    getInitialState: function() {
        return {
            address: activeAddress,
            addressInfo: addressInfo
        };
    },

    isActive:function(){
        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }
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

    nextStep:function(){

        this.props.handleNext( this.props.nextStep );
    },

    render: function(){

        var primaryAddress 	= this.getPrimaryAddress();
        var shippingAddress = this.getShippingAddress();
        var homeAddress 	= this.getHomeAddress();

        var helpText = {
            ssn: "Please Note: This cannot be an EIN and is required for appointment."
        };

        return(

            <fieldset
                id        = "agentInfoFldset"
                className = { this.isActive() }
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
                    onClick     = { this.nextStep }
                >
                    Next!
                </button>

                { /* END fieldset#agentInfoFldset */}
            </fieldset>

        );
    }
});

module.exports = AgentInformation;

