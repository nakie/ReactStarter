var React = require('react');
var ReactDOM = require( 'react-dom' );

var LoginForm = require( './components/LoginForm' );

console.log( LoginForm );

ReactDOM.render(
  <LoginForm />,
  document.getElementById( 'loginFrm' )
  
);
