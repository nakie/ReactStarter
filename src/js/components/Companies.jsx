/**
 * Created by Nathan on 8/18/2016.
 */
/**
 * Created by Nathan on 8/18/2016.
 */

var React       = require('react');

// var FrmInput 	= require( './Input' );
var FrmCheckbox = require( './Checkbox' );
// var FrmRadio	= require( './Radio' );
// var FrmOption   = require( './Option' );
// var OptionGroup	= require( './OptionGroup' );

var activeTab = {
    byCompany: "active",
    byProduct: ""
}; // END activeTab {}

var companyList = [
    { name: "Humana",
        machineName: "humana",
        options: [ "Medicare Advantage", "PDP", "Medicare Supplement", "Individual Major Medical" ],
        active: true
    },
    { name: "CVS Caremark/Silverscript",
        machineName: "caremark",
        options: [ "PDP"],
        active: true
    },
    { name: "Medico",
        machineName: "medico",
        options: [ "Medicare Supplement", "Dental", "Vision", "Hearing", "Hosptial Indemnity", "Final Expense", ],
        active: true
    },
    { name: "Kember Senior Solutions",
        machineName: "kemper",
        options: [ "Home Health Care" ],
        active: true
    },
    { name: "Standard Life & Casualty",
        machineName: "standardLife",
        options: [ "Home Health Care" ],
        active: true
    },
    { name: "Wellcare",
        machineName: "wellcare",
        options: ["Medicare Advantage", "PDP" ],
        active: true
    },
    { name: "Cigna Healthspring",
        machineName: "cignaHealthspring",
        options: [ "Medicare Advantage" ],
        active: true
    },
    { name: "Cigna",
        machineName: "cigna",
        options: [ "Medicare Supplement", "PDP" ],
        active: true
    },
    { name: "Aetna/Coventry",
        machineName: "aetnaCoventry",
        options: [ "Medicare Advantage" ],
        active: true
    },
    { name: "Aetna",
        machineName: "aetna",
        options: [ "Medicare Supplement" ],
        active: true
    },
    { name: "Equitable",
        machineName: "equitable",
        options: [ "Medicare Supplement" ],
        active: true
    },
    { name: "GTL",
        machineName: "gtl",
        options: [],
        active: true
    },
    { name: "Combined",
        machineName: "combined",
        options: [],
        active: true
    },
    { name: "Gerber",
        machineName: "gerber",
        options: [ "Final Expense", "Medicare Supplement" ],
        active: true
    },
    { name: "Life Secure",
        machineName: "lifeSecure",
        options: [],
        active: true
    },
    { name: "United Home Life",
        machineName: "unitedHomeLife",
        options: [ "Medicare Supplement" ],
        active: true
    },
    { name: "Washington National",
        machineName: "washingtonNational",
        options: [],
        active: true
    },
    { name: "Standard Life and Accident",
        machineName: "standardLifeAccident",
        options: [ "SLAICO"],
        active: true
    },
    { name: "Today's Options",
        machineName: "today",
        options: [ "Medicare Advantage" ],
        active: true
    },
    { name: "United Healthcare One",
        machineName: "unitedHealthcareOne",
        options: [ "Individual Major Medical", "Short Term Medical" ],
        active: true
    },
    { name: "Humana One",
        machineName: "humanaOne",
        options: [ "Individual Major Medical", "Short Term Medical" ],
        active: true
    },
    { name: "Silverscript",
        machineName: "silverscript",
        options: [ "PDP" ],
        active: true
    },

];

var Companies = React.createClass({

    getInitialState: function() {

        var listCompany = {};
        var listProduct = {};

        companyList.map( function( companyObj ){
            if( !listCompany.hasOwnProperty( companyObj.machineName ) ) {
                listCompany[ companyObj.machineName + "Apt" ] = false;
            }

            companyObj.options.map( function( product ){
                if( !listProduct.hasOwnProperty( product ) ){
                    listProduct[ product ] = '';
                }

            });
        });

        // console.log( listProduct );

        return {
            companySelected: listCompany,
            activeProduct: listProduct,
            tab: activeTab
        };
    },

    byProduct: function(){

        var list = {};

        companyList.map( function( company ){

            company.options.map( function( product ){

                if( list.hasOwnProperty( product ) ){
                    list[product].push( company.name );
                }else{
                    list[product] = [ company.name ];

                }
            });

        });

        return list;

    },

    byCompany:function(){

        var list = {};

        companyList.map( function( company ){

            if( !list.hasOwnProperty( company.name ) ) {
                list[company.name] = company.options;
            }
        });

        // console.log(list);
        return list;

    },

    // renderList:function( sortby ){
    //
    //     switch( sortby ){
    //         case "product":
    //             break;
    //         case "state" :
    //             break;
    //         default:
    //
    //     }
    //
    // },

    toggleValue: function( name ){
        var list = this.state.companySelected;

        list[ name ] = !list[ name ];
        // console.log( name + ": " + list[ name ] );
        this.setState( { companySelected: list });

        // console.log( this.state );
    },

    // linkedCheckbox: function(key) {
    //     return {
    //         value: this.state.companySelected[key],
    //         requestChange: function( newValue ) {
    //             var list = this.state.companySelected;
    //             list[ key ] = newValue;
    //             this.setState({ "companySelected" : list })
    //         }.bind( this )
    //     }
    // },

    renderByCompany: function(){

        // var itemsObj = byCompany();
        var itemsObj = companyList;

        // var elements = [];
        var elements = itemsObj.map( function( companyObj ){

            var helpText = '';
            if( companyObj.options.length ){

                helpText = <p className="help-block" >{ "(" + companyObj.options.join( ", " ) + ")"}</p>;
            }

            // console.log( this.state.companySelected[ companyObj.machineName + "Apt" ] );
            return(
                // <FrmCheckbox
                //     name    = { companyObj.machineName + "Apt" }
                //     title   = { companyObj.name }
                //     value   = "Y"
                //     key     = { companyObj.machineName }
                //     helpText        = { helpText }
                //     toggleOption    = { this.toggleValue }
                //     toggleElement   = { companyObj.machineName + "Apt" }
                //     defaultChecked  = { this.state.companySelected[ companyObj.machineName + "Apt" ] }
                //     checkedLink     = { this.linkedCheckbox( companyObj.machineName + "Apt" )}
                // />
                <div className="checkbox" key     = { companyObj.machineName }>
                    <label >
                        <input
                            type	    = { 'checkbox' }
                            name	    = { companyObj.machineName + "Apt" }
                            onChange    = { this.changeTest }
                            value       = "Y"
                            checked     = { this.state.companySelected[ companyObj.machineName + "Apt" ] }
                        />
                        {  companyObj.name }
                    </label>
                    { helpText }
                </div>
            );

        }, this);

        return elements;
    },

    renderByProduct: function(){

        var list = {};

        companyList.map( function( companyObj, outerIndex ){

            companyObj.options.map( function( product, innerIndex ){

                // console.log( companyObj.machineName + product.replace(/\s/g,'') );
                var element =
                    <li key     = { companyObj.machineName + "_" + outerIndex + "_" + innerIndex } >
                        {/*<FrmCheckbox*/}
                            {/*name    = { companyObj.machineName + "Apt" }*/}
                            {/*title   = { companyObj.name }*/}
                            {/*value   = "Y"*/}
                            {/*defaultChecked  = { this.state.companySelected[ companyObj.machineName + "Apt" ] }*/}
                            {/*checkedLink     = { this.linkedCheckbox( companyObj.machineName + "Apt" )}*/}
                        {/*/>*/}

                        <div className="checkbox">
                            <label >
                                <input
                                    type	    = { 'checkbox' }
                                    name	    = { companyObj.machineName + "Apt" }
                                    onChange    = { this.changeTest }
                                    value       = "Y"
                                    checked     = { this.state.companySelected[ companyObj.machineName + "Apt" ] }
                                />
                                {  companyObj.name }
                            </label>
                        </div>
                    </li>;

                if( list.hasOwnProperty( product ) ){
                    list[ product ].push( element );
                }else{
                    list[ product ] = [ element ];
                }

            }, this);

        }, this);

        // console.log( list );
        var output=[];

        var ulCount = 0;

        for( var product in list) {

            if (list.hasOwnProperty( product )) {

                // console.log( product.replace(/\s/g,'') );
                var element =
                    <li key={ product.replace(/\s/g,'') } className={ "product " + this.state.activeProduct[ product ] } >
                        <a className="toggleProduct" onClick={ this.showProduct } data-target = { product } >{ product }</a>
                        <ul >
                            { list[ product ] }
                        </ul>
                    </li>;

                output.push( element );
                ulCount++;
            }
        }

        return(
            <ul>
                { output }
            </ul>
        );
        //return list;

    },

    showProduct: function(event){
        // console.log( event.target.getAttribute( 'data-target' ) );

        var target = event.target.getAttribute( 'data-target' );

        var list = this.state.activeProduct;

        if( !list[ target ] ){
            list[ target ] = 'active';
        } else {

            list[ target ] = '';
        }

        this.setState({ 'activeProduct': list });



    },

    changeTest: function( e ){

        var curList = this.state.companySelected;

        // curList[ e.target.name ] =

        // console.log( e.target.checked );
        // console.log( e.target.name );
        curList[ e.target.name ] = e.target.checked;

        this.setState( { "companySelected": curList } );

    },

    isActive: function(){

        if( this.props.active ){
            return "active";
        } else {
            return " ";
        }

    },

    handleTab: function( value, event ){

        for( var k in activeTab ){

            if( activeTab.hasOwnProperty( k ) ){

                if( k == value ){
                    activeTab[k] = "active"
                }else{
                    activeTab[k] = ""
                }
            }
        }

        this.setState( { tab: activeTab  } );

        event.preventDefault();
    },

    getResState: function( state ){
        this.setState( { resState: state } );
    },

    nextStep:function(){
        this.props.handleNext( this.props.nextStep );
    },

    render: function(){

        var byProduct = this.byProduct();
        var byCompany = this.byCompany();

        return(

            <fieldset
                id          = "finishFldset"
                className   = { this.isActive() }
            >
                <legend>Requested Appointments</legend>

                <nav className="multiAddress-nav ">
                    <ul className="nav nav-tabs" >
                        <li className={activeTab.byCompany} >
                            <a href="#" data-target="primaryAddress" onClick={ this.handleTab.bind( this, "byCompany" ) } >By Company</a>
                        </li>
                        <li className={activeTab.byProduct} >
                            <a href="#" data-target="homeAddress" onClick={ this.handleTab.bind( this, "byProduct" ) } >By Product</a>
                        </li>
                    </ul>
                </nav>
                <div className="appointments">
                    <div className= { activeTab.byCompany + ' byCompany' } >
                        { this.renderByCompany() }
                    </div>
                    <div className= { activeTab.byProduct + ' byProduct' } >
                        { this.renderByProduct() }
                    </div>
                </div>

                <button
                    type 		= "button"
                    className 	= "btn btn-default"
                    onClick     = { this.nextStep }
                >
                    Next!
                </button>

            </fieldset>

        );
    }
});

module.exports = Companies;