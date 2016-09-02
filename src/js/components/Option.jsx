var React = require( 'react' );


var Option = React.createClass({


	changeValue: function( event ) {
		
	},

	render() {

		return (
			<option value = { this.props.value } >{ this.props.title }</option>
		);

	}

});


module.exports = Option;
