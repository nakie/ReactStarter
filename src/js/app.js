var React = require('react');
var ReactDOM = require( 'react-dom' );

var LoginForm = require( './components/LoginForm' );
var RegistrationShortForm = require( './components/RegistrationShortForm' );
var RegistrationFullForm = require( './components/RegistrationFullForm2' );

var loginFrm = document.getElementById( 'loginFrm' );
if( loginFrm != null ){
	ReactDOM.render(
		<LoginForm />,
		loginFrm
	);
}

var registrationFrm = document.getElementById( 'registrationFrm' );
if( registrationFrm != null ){
	ReactDOM.render(
		<RegistrationShortForm />,
		registrationFrm
	);
}

var registrationFullFrm = document.getElementById( 'registrationFullFrm' );

if( registrationFullFrm != null ){
	ReactDOM.render(
		<RegistrationFullForm />,
		registrationFullFrm
	);
}





